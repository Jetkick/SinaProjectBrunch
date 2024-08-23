import { Request, Response } from 'express';
import { User } from 'src/apis/signUp/entities/signUp.entity';

export interface IAuthUser {
  user: {
    id: string;
    validateUser?: User;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
