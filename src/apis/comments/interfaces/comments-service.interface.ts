import { IAuthUser } from 'src/common/interfaces/context';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';

export interface ICommentsServiceFindOneByCommentId {
  commentId: string;
}

export interface ICommentsServiceFetchComment {
  storyId: string;
}

export interface ICommentsServiceCreate {
  storyId: string;
  commentId: string;
  createCommentInput: CreateCommentInput;
  user: IAuthUser['user'];
}

export interface ICommentsServiceUpdate {
  storyId: string;
  commentId: string;
  updateCommentInput: UpdateCommentInput;
}

export interface ICommentsServiceDelete {
  storyId: string;
  commentId: string;
}
