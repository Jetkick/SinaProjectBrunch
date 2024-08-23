import { IAuthUser } from 'src/common/interfaces/context';

export interface ILikesServiceFindOneByLikeId {
  likeId: string;
}

export interface ILikesServiceFindOneByStoryUserId {
  storyId: string;
  userId: string;
}

export interface ILikesServiceCreate {
  storyId: string;
  user: IAuthUser['user'];
}

export interface ILikesServiceUpdate {
  storyId: string;
  likeId: string;
  user: IAuthUser['user'];
}
