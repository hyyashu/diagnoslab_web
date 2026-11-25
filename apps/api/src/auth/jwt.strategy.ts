import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './jwt-secret';
import { AccessService } from './access.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly access: AccessService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret(),
    });
  }

  /* The token only says who you are. What you may do is looked up fresh,
     so disabling someone or changing their role works straight away. */
  async validate(payload: { sub: number; sv?: number }) {
    const user = await this.access.get(Number(payload.sub));
    if (!user || !user.isActive || (payload.sv ?? 0) !== user.sessionVersion) {
      throw new UnauthorizedException('Please sign in again');
    }
    return user;
  }
}
