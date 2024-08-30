import { IAuthUser } from 'src/common/interfaces/context';

export interface ILikesServiceFindOneByLikeId {
  likeId: string;
}

export interface ILikesServiceFindOneByStoryUserId {
  storyId: string;
  userId: string;
}

export interface ILikesServiceFindOneByStoryBookUserId {
  storyBookId: string;
  userId: string;
}

export interface ILikesServiceCreate {
  storyId: string;
  storyBookId: string;
  user: IAuthUser['user'];
}

export interface ILikesServiceUpdate {
  storyId: string;
  storyBookId: string;
  likeId: string;
  user: IAuthUser['user'];
}
