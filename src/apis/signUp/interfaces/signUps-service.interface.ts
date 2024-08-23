import { IAuthUser } from 'src/common/interfaces/context';
import { CreateUserInput } from '../dto/create-signUp.input';
import { UpdateUserInput } from '../dto/update-signUp.input';

export interface ISignUpsServiceFindOneByEmail {
  email: string;
}

export interface ISignUpsServiceFindOneByUserId {
  userId: string;
}

export interface ISignUpsServiceFetchUser {
  email: string;
}

export interface ISignUpsServiceCreate {
  createUserInput: CreateUserInput;
}

export interface ISignUpsServiceUpdate {
  user: IAuthUser['user'];
  updateUserInput: UpdateUserInput;
}

export interface ISignUpsServiceDelete {
  user: IAuthUser['user'];
}
