import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IStoryBooksServiceCreate,
  IStoryBooksServiceDelete,
  IStoryBooksServiceFetchStoryBook,
  IStoryBooksServiceFindOneByStoryBookId,
  IStoryBooksServiceFindOneByStoryBookTitle,
  IStoryBooksServiceUpdate,
  IStroyBooksServiceFindOneByStoryBookStoryId,
} from './interfaces/storyBooks-service.interface';
import { StoryBook } from './entities/storyBook.entity';
import { StoriesService } from '../stories/stories.service';

@Injectable()
export class StoryBooksService {
  constructor(
    @InjectRepository(StoryBook)
    private readonly storyBooksRepository: Repository<StoryBook>, //

    private readonly storiesService: StoriesService,
  ) {}

  async findOneByStoryBookId({
    storyBookId,
  }: IStoryBooksServiceFindOneByStoryBookId): Promise<StoryBook> {
    const storyBook = await this.storyBooksRepository.findOne({
      where: { id: storyBookId },
    });

    if (!storyBook)
      throw new UnprocessableEntityException('이야기 책을 찾을 수 없습니다!');

    return storyBook;
  }

  async findOneByStoryBookTitle({
    title,
    userId,
  }: IStoryBooksServiceFindOneByStoryBookTitle): Promise<StoryBook> {
    const storyBookTitle = await this.storyBooksRepository
      .createQueryBuilder('story_book')
      .select('title')
      .where('story_book.title = :title', { title })
      .andWhere('story_book.userId = :userId', { userId })
      .getRawOne();

    if (!storyBookTitle) {
      return null;
    } else if (storyBookTitle) {
      return storyBookTitle;
    }
  }

  async findOneByStoryBookStoryId({
    storyBookId,
    storyId,
    userId,
  }: IStroyBooksServiceFindOneByStoryBookStoryId) {
    const storyBookStoryId = await this.storyBooksRepository
      .createQueryBuilder('story_book')
      .select('storyId')
      .where('story_book.userId = :userId', { userId })
      .andWhere('id = :storyBookId', { storyBookId })
      .getRawOne();

    const storyIdValue = storyBookStoryId.storyId.split(',');

    const result = [];

    Object.values(storyIdValue).forEach((item) => {
      if (item === storyId) {
        return result.push(item);
      } else {
        return null;
      }
    });

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  async fetchStoryBook({
    storyBookId,
  }: IStoryBooksServiceFetchStoryBook): Promise<StoryBook> {
    const result = await this.findOneByStoryBookId({ storyBookId });

    return result;
  }

  async createStoryBook({
    createStoryBookInput,
    storyId,
    user,
  }: IStoryBooksServiceCreate): Promise<StoryBook> {
    const story = await this.storiesService.findOneByStoryId({ storyId });

    const storyBook = await this.findOneByStoryBookTitle({
      title: createStoryBookInput.title,
      userId: user.validateUser.id,
    });

    if (storyBook)
      throw new UnprocessableEntityException('같은 제목이 존재합니다!');

    if (story === null) {
      const result = this.storyBooksRepository.create({
        ...createStoryBookInput,
        storyId: [],
        userId: user.validateUser,
      });

      return this.storyBooksRepository.save(result);
    } else {
      const result = this.storyBooksRepository.create({
        ...createStoryBookInput,
        storyId: [story.id],
        userId: user.validateUser,
      });

      return this.storyBooksRepository.save(result);
    }
  }

  async updateStoryBook({
    updateStoryBookInput,
    storyId,
    storyBookId,
    user,
  }: IStoryBooksServiceUpdate): Promise<StoryBook> {
    const storyBook = await this.findOneByStoryBookId({ storyBookId });

    const story = await this.storiesService.findOneByStoryId({ storyId });

    const storyBookStoryId = await this.findOneByStoryBookStoryId({
      storyBookId,
      storyId,
      userId: user.validateUser.id,
    });

    if (!storyBookStoryId) {
      const result = this.storyBooksRepository.merge(storyBook, {
        ...updateStoryBookInput,
        storyId: [...(storyBook.storyId || []), story.id],
      });

      return this.storyBooksRepository.save(result);
    } else if (storyBookStoryId) {
      const updatedStoryId = (storyBook.storyId || []).filter(
        (id) => id !== story.id,
      );

      const result = this.storyBooksRepository.merge(storyBook, {
        ...updateStoryBookInput,
        storyId: updatedStoryId,
      });

      return this.storyBooksRepository.save(result);
    }
  }

  async deleteStoryBook({
    storyBookId,
  }: IStoryBooksServiceDelete): Promise<boolean> {
    const result = await this.storyBooksRepository.softDelete({
      id: storyBookId,
    });

    return result.affected ? true : false;
  }
}
