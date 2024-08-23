import { Request, Response } from 'express';
import { IOAuthUser } from 'src/apis/auth/interfaces/auth-service.interface';
import { User } from 'src/apis/signUp/entities/signUp.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

export interface IUsersServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IUsersServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}

export interface IUsersServiceRefreshToken {
  user: IAuthUser['user'];
}

export interface IUsersServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IUsersServiceGetAccessToken {
  user: IAuthUser['user'];
}
