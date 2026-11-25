import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { AuthService } from './auth.service';
import { loginSchema } from '@diagno/schemas';
import { Message } from 'src/common/decorators/message.decorator';
import { Public } from './public.decorator';

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
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    return this.authService.login(user);
  }
}
