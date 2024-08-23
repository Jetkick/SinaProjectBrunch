import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import {
  IStoriesServiceCreate,
  IStoriesServiceDelete,
  IStoriesServiceFetchStories,
  IStoriesServiceFetchStory,
  IStoriesServiceFindOneByStoryId,
  IStoriesServiceFindOneByTitle,
  IStoriesServiceUpdate,
} from './interfaces/stories-service.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>, //
  ) {}

  async findOneByStoryId({
    storyId,
  }: IStoriesServiceFindOneByStoryId): Promise<Story> {
    if (storyId === undefined) {
      return null;
    } else {
      const story = await this.storiesRepository.findOne({
        where: { id: storyId },
      });

      if (!story)
        throw new UnprocessableEntityException('이야기를 찾을 수 없습니다!');

      return story;
    }
  }

  async findOneByTitle({
    title,
    userId,
  }: IStoriesServiceFindOneByTitle): Promise<void> {
    const storyUser = await this.storiesRepository
      .createQueryBuilder('story')
      .select('title')
      .where('story.userId = :userId', { userId })
      .getRawMany();

    const result = storyUser.filter((item) => item.title === title);

    if (result.length > 0) {
      throw new UnprocessableEntityException('이미 같은 제목이 존재합니다!');
    }
  }

  async fetchStories({
    userId,
  }: IStoriesServiceFetchStories): Promise<Story[]> {
    return await this.storiesRepository
      .createQueryBuilder('story')
      .select('*')
      .where('story.userId = :userId', { userId })
      .limit(5)
      .getRawMany();
  }

  async fetchStory({ storyId }: IStoriesServiceFetchStory): Promise<Story> {
    await this.findOneByStoryId({ storyId });

    return await this.storiesRepository.findOne({
      where: { id: storyId },
    });
  }

  async createStory({
    createStoryInput,
    user,
  }: IStoriesServiceCreate): Promise<Story> {
    await this.findOneByTitle({
      title: createStoryInput.title,
      userId: user.validateUser.id,
    });

    const result = this.storiesRepository.create({
      ...createStoryInput,
      userId: user.validateUser,
    });

    return this.storiesRepository.save(result);
  }

  async updateStory({
    storyId,
    updateStoryInput,
  }: IStoriesServiceUpdate): Promise<Story> {
    const story = await this.findOneByStoryId({ storyId });

    const result = this.storiesRepository.merge(story, {
      ...updateStoryInput,
    });

    return this.storiesRepository.save(result);
  }

  async deleteStory({ storyId }: IStoriesServiceDelete): Promise<boolean> {
    await this.findOneByStoryId({ storyId });

    const result = await this.storiesRepository.softDelete({
      id: storyId,
    });

    return result.affected ? true : false;
  }
}
