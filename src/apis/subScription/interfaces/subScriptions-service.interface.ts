import { IAuthUser } from 'src/common/interfaces/context';

export interface ISubScriptionsServiceFindOneBySubScriptionUserId {
  userId: string;
  subScriptionUserId: string;
}

export interface ISubScriptionsServiceCreate {
  subscriptionUser: string;
  user: IAuthUser['user'];
}

export interface ISubScriptionsServiceCancel {
  subscriptionUser: string;
  user: IAuthUser['user'];
}
