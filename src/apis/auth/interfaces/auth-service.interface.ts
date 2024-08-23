import { User } from 'src/apis/signUp/entities/signUp.entity';

export interface IOAuthUser {
  user: Omit<User, 'id'>;
}
