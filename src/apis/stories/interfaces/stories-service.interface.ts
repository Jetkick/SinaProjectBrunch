import { CreateStoryInput } from '../dto/create-story.input';
import { IAuthUser } from 'src/common/interfaces/context';
import { UpdateStoryInput } from '../dto/update-story.input';
import { User } from 'src/apis/signUp/entities/signUp.entity';

export interface IStoriesServiceFindOneByStoryId {
  storyId: string;
}

export interface IStoriesServiceFindOneByTitle {
  title: string;
  userId: string;
}

export interface IStoriesServiceFetchStories {
  userId: string;
}

export interface IStoriesServiceFetchStory {
  storyId: string;
}

export interface IStoriesServiceCreate {
  createStoryInput: CreateStoryInput;
  user: IAuthUser['user'];
}

export interface IStoriesServiceUpdate {
  storyId: string;
  updateStoryInput: UpdateStoryInput;
}

export interface IStoriesServiceDelete {
  storyId: string;
}
