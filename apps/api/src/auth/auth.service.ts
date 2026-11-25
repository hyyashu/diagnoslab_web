import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { users } from '@diagno/db';
import { ROLES, type RoleName } from '@diagno/schemas';
import { UsersService } from '../routes/users/users.service';
import { DrizzleService } from '../db/drizzle.service';
import { AccessService, type AccessUser } from './access.service';
import { hashPassword, verifyPassword } from './password';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private drizzleService: DrizzleService,
    private access: AccessService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email.trim().toLowerCase());
    if (!user) throw new UnauthorizedException('Wrong email or password');

    const { ok, needsRehash } = await verifyPassword(password, user.password);
    if (!ok) throw new UnauthorizedException('Wrong email or password');
    if (!user.isActive) throw new UnauthorizedException('This account is switched off. Ask the owner.');
    if (needsRehash) await this.usersService.setPasswordHash(user.id, await hashPassword(password));
    return user;
  }

  /* The token carries who you are and your session version. Permissions are
     looked up on each request (see JwtStrategy), and also sent here so the
     apps can show the right menus. */
  async login(user: { id: number }) {
    await this.drizzleService.db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
    this.access.forget(user.id);
    const a = (await this.access.get(user.id))!;
    return {
      access_token: this.jwtService.sign({ sub: a.id, role: a.role, sv: a.sessionVersion }),
      ...me(a),
    };
  }
}

export function me(a: AccessUser) {
  return {
    user: {
      id: a.id,
      name: a.name,
      email: a.email,
      role: a.role,
      roleLabel: ROLES[a.role as RoleName]?.label ?? a.role,
    },
    permissions: a.permissions,
  };
}
