import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '@diagno/schemas';
import { Message } from 'src/common/decorators/message.decorator';
import { AuthService, me } from './auth.service';
import { Public } from './public.decorator';
import type { AccessUser } from './access.service';

export class LoginDto extends createZodDto(loginSchema) {}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @Message('Logged in successfully')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  /* Who is signed in and what they may do, fresh. The apps call this on
     start so menus follow role changes without signing out. */
  @Get('me')
  @Message('Signed in')
  whoAmI(@Req() req: { user: AccessUser }) {
    return me(req.user);
  }
}
