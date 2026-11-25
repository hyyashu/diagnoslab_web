import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators/message.decorator';
import { Audit } from 'src/common/interceptors/audit.interceptor';
import { Permission } from 'src/auth/permissions.decorator';
import { User } from 'src/auth/user.decorator';
import { CreateUserDto, SetOverridesDto, UpdateUserDto } from './users-dto';
import { UsersService } from './users.service';

/* Staff accounts and access. Owner only by default (users:manage).
   No delete: switch people off instead, so their history keeps a name. */
@ApiTags('users')
@Permission('users:manage')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Message('Staff')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('access-catalog')
  @Message('Roles and permissions')
  catalog() {
    return this.usersService.catalog();
  }

  @Post()
  @Audit('user')
  @Message('Staff member added')
  @ApiBody({ type: CreateUserDto })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  @Audit('user')
  @Message('Staff member updated')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto, @User('id') actorId: number) {
    return this.usersService.update(id, dto, actorId);
  }

  @Put(':id/permissions')
  @Audit('user_permissions')
  @Message('Access updated')
  @ApiBody({ type: SetOverridesDto })
  setOverrides(@Param('id', ParseIntPipe) id: number, @Body() dto: SetOverridesDto) {
    return this.usersService.setOverrides(id, dto);
  }
}
