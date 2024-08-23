import { IAuthUser } from 'src/common/interfaces/context';
import { CreateStoryBookInput } from '../dto/create-storyBook.input';
import { UpdateStoryBookInput } from '../dto/update-storyBook.input';

export interface IStoryBooksServiceFindOneByStoryBookId {
  storyBookId: string;
}

export interface IStoryBooksServiceFindOneByStoryBookTitle {
  title: string;
  userId: string;
}

export interface IStroyBooksServiceFindOneByStoryBookStoryId {
  storyBookId: string;
  storyId: string;
  userId: string;
}

export interface IStoryBooksServiceFetchStoryBook {
  storyBookId: string;
}

export interface IStoryBooksServiceCreate {
  createStoryBookInput: CreateStoryBookInput;
  storyId: string;
  user: IAuthUser['user'];
}

export interface IStoryBooksServiceUpdate {
  updateStoryBookInput: UpdateStoryBookInput;
  storyId: string;
  storyBookId: string;
  user: IAuthUser['user'];
}

export interface IStoryBooksServiceDelete {
  storyBookId: string;
}
