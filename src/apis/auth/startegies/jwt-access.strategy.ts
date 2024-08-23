import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SignUpsService } from 'src/apis/signUp/signups.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly signUpsService: SignUpsService, //
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'userPassword',
    });
  }

  async validate(payload) {
    const userId = payload.sub;

    const validateUser = await this.signUpsService.findOneByUserId({ userId });

    if (!validateUser)
      throw new UnprocessableEntityException('유저가 없습니다!');

    return {
      id: payload.sub,
      validateUser,
    };
  }
}
