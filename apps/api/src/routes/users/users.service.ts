import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto, UpdateUserDto } from './users-dto';
import { users } from '@diagno/db';
import { DrizzleService } from 'src/db/drizzle.service';
import { eq } from 'drizzle-orm';
import { USER_CREATED } from '../../email/events/email.events';
import { hashPassword } from '../../auth/password';

/* Columns safe to send back: everything except the password hash. */
const publicColumns = {
  id: users.id,
  name: users.name,
  email: users.email,
  role: users.role,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

@Injectable()
export class UsersService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.drizzleService.db
      .insert(users)
      .values({
        ...createUserDto,
        password: await hashPassword(createUserDto.password),
      })
      .returning(publicColumns);
    const created = result[0];
    if (created) {
      this.eventEmitter.emit(USER_CREATED, {
        email: created.email,
        name: created.name ?? undefined,
      });
    }
    return result;
  }

  async findAll() {
    return await this.drizzleService.db.select(publicColumns).from(users);
  }

  async findOne(id: number) {
    return await this.drizzleService.db
      .select(publicColumns)
      .from(users)
      .where(eq(users.id, id));
  }

  async update(id: number, updateUsersDto: UpdateUserDto) {
    const { password, ...rest } = updateUsersDto;
    return await this.drizzleService.db
      .update(users)
      .set({
        ...rest,
        ...(password && { password: await hashPassword(password) }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning(publicColumns);
  }

  /* Used by login to replace an old plain-text password with its hash. */
  async setPasswordHash(id: number, hash: string) {
    await this.drizzleService.db
      .update(users)
      .set({ password: hash })
      .where(eq(users.id, id));
  }

  async remove(id: number) {
    return await this.drizzleService.db
      .delete(users)
      .where(eq(users.id, id))
      .returning(publicColumns);
  }

  async findByEmail(email: string) {
    return await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  }
}
