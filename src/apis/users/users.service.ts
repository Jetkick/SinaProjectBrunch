import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpsService } from '../signUp/signups.service';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceGetAccessToken,
  IUsersServiceLogin,
  IUsersServiceLoginOAuth,
  IUsersServiceRefreshToken,
  IUsersServiceSetRefreshToken,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly signUpsService: SignUpsService, //

    private readonly jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IUsersServiceLogin): Promise<string> {
    const user = await this.signUpsService.findOneByEmail({ email });

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    this.setRefreshToken({ user, res: context.res });

    return this.getAccessToken({ user });
  }

  // 소셜 로그인 불안정
  async loginOAuth({ req, res }: IUsersServiceLoginOAuth) {
    let user = await this.signUpsService.findOneByEmail({
      email: req.user.email,
    });

    // 카톡 데이터에 없는 데이터는 직접 입력 해줘야 함
    if (!user)
      user = await this.signUpsService.createUser({
        createUserInput: req.user,
      });

    this.setRefreshToken({ user, res });

    res.redirect('http://127.0.0.1:5501/frontend/social-login-test.html');
  }

  restoreAccessToken({ user }: IUsersServiceRefreshToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, res }: IUsersServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'userRefreshPassword', expiresIn: '2w' },
    );
    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IUsersServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'userPassword', expiresIn: '1h' },
    );
  }
}
