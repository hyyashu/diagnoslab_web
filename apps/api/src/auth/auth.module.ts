import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { PermissionsGuard } from './permissions.guard';
import { UsersModule } from '../routes/users/users.module';
import { ConfigService } from '@nestjs/config';
import { jwtSecret } from './jwt-secret';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtSecret(),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    // Note: DrizzleModule is NOT imported here because it is @Global().
    // DrizzleService is already injectable in AuthService without re-importing.
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    PermissionsGuard,
  ],
  controllers: [AuthController],
  // Export guards so AppModule can register them as global APP_GUARD providers
  exports: [JwtAuthGuard, RolesGuard, PermissionsGuard],
})
export class AuthModule {}
