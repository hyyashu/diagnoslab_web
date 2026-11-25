import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../routes/users/users.service';
import { DrizzleService } from '../db/drizzle.service';
import { rolePermissions, userPermissions } from '@diagno/db';
import { eq, and } from 'drizzle-orm';
import { Role } from './roles.enum';
import { hashPassword, verifyPassword } from './password';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    // DrizzleModule is @Global() so DrizzleService is injectable here
    // without adding DrizzleModule to AuthModule's imports
    private drizzleService: DrizzleService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const { ok, needsRehash } = await verifyPassword(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Wrong email or password');
    }
    if (needsRehash) {
      await this.usersService.setPasswordHash(
        user.id,
        await hashPassword(password),
      );
    }

    return user;
  }

  async login(user: any) {
    // SUPERADMIN bypasses all permission checks in PermissionsGuard,
    // so we skip DB queries and embed an empty permissions array.
    if (user.role === Role.SUPERADMIN) {
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        permissions: [], // guard short-circuits before checking this array
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: publicUser(user),
      };
    }

    // Step 1: Fetch all permissions granted to this user's role.
    // Only rows where granted=true are included as the role baseline.
    const rolePerm = await this.drizzleService.db
      .select()
      .from(rolePermissions)
      .where(
        and(
          eq(rolePermissions.role, user.role),
          eq(rolePermissions.granted, true),
        ),
      );

    // Use a Set for O(1) lookups and easy override application
    const permSet = new Set<string>(rolePerm.map((r) => r.permissionName));

    // Step 2: Fetch per-user overrides and apply on top of role defaults.
    // granted=true → add to set (allow override, even if role denies it)
    // granted=false → remove from set (deny override, even if role allows it)
    const userPerm = await this.drizzleService.db
      .select()
      .from(userPermissions)
      .where(eq(userPermissions.userId, user.id));

    for (const override of userPerm) {
      if (override.granted) {
        permSet.add(override.permissionName); // grant override
      } else {
        permSet.delete(override.permissionName); // deny override
      }
    }

    // Embed the final resolved permission list in the token.
    // PermissionsGuard reads this array directly — zero DB queries per request.
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: Array.from(permSet),
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: publicUser(user),
    };
  }
}

/* What the apps need to show who is logged in. Never the password. */
function publicUser(user: {
  id: number;
  name: string;
  email: string;
  role: string;
}) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
