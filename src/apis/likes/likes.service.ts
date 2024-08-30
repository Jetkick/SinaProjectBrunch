import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import {
  ILikesServiceCreate,
  ILikesServiceFindOneByLikeId,
  ILikesServiceFindOneByStoryBookUserId,
  ILikesServiceFindOneByStoryUserId,
  ILikesServiceUpdate,
} from './interfaces/likes-service.interface';
import { Repository } from 'typeorm';
import { StoriesService } from '../stories/stories.service';
import { StoryBooksService } from '../storyBooks/storyBooks.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>, //

    private readonly storiesService: StoriesService,

    private readonly storyBooksService: StoryBooksService,
  ) {}

  async findOneByLikeId({
    likeId,
  }: ILikesServiceFindOneByLikeId): Promise<Like> {
    const like = await this.likesRepository.findOne({
      where: { id: likeId },
    });

    if (!like)
      throw new UnprocessableEntityException('좋아요를 찾을 수 없습니다!');

    return like;
  }

  async findOneByLikeStoryUserId({
    storyId,
    userId,
  }: ILikesServiceFindOneByStoryUserId): Promise<Like> {
    return await this.likesRepository
      .createQueryBuilder('like')
      .select('id')
      .where('like.storyId = :storyId', { storyId })
      .andWhere('like.userId = :userId', { userId })
      .getRawOne();
  }

  async findOneByLikeStoryBookUserId({
    storyBookId,
    userId,
  }: ILikesServiceFindOneByStoryBookUserId): Promise<Like> {
    return await this.likesRepository
      .createQueryBuilder('like')
      .select('id')
      .where('like.storyBookId = :storyBookId', { storyBookId })
      .andWhere('like.userId = :userId', { userId })
      .getRawOne();
  }

  async createLike({
    storyId,
    storyBookId,
    user,
  }: ILikesServiceCreate): Promise<Like> {
    if (storyId) {
      const storyIdId = await this.storiesService.findOneByStoryId({ storyId });

      const validate = await this.findOneByLikeStoryUserId({
        storyId,
        userId: user.id,
      });

      if (validate === undefined) {
        const result = this.likesRepository.create({
          like: true,
          userId: user.validateUser,
          storyId: storyIdId,
        });

        return this.likesRepository.save(result);
      } else {
        throw new UnprocessableEntityException('이미 좋아요를 하셨습니다!');
      }
    } else if (storyBookId) {
      const storyBookIdId = await this.storyBooksService.findOneByStoryBookId({
        storyBookId,
      });

      const validate = await this.findOneByLikeStoryBookUserId({
        storyBookId,
        userId: user.id,
      });

      if (validate === undefined) {
        const result = this.likesRepository.create({
          like: true,
          userId: user.validateUser,
          storyBookId: storyBookIdId,
        });

        return this.likesRepository.save(result);
      } else {
        throw new UnprocessableEntityException('이미 좋아요를 하셨습니다!');
      }
    }
  }

  async updateLike({
    storyId,
    storyBookId,
    likeId,
  }: ILikesServiceUpdate): Promise<Like> {
    if (storyId) {
      await this.storiesService.findOneByStoryId({ storyId });

      const like = await this.findOneByLikeId({ likeId });

      if (like.like === true) {
        const result = this.likesRepository.merge(like, {
          like: false,
        });

        return this.likesRepository.save(result);
      } else {
        const result = this.likesRepository.merge(like, {
          like: true,
        });

        return this.likesRepository.save(result);
      }
    } else if (storyBookId) {
      await this.storyBooksService.findOneByStoryBookId({ storyBookId });

      const like = await this.findOneByLikeId({ likeId });

      if (like.like === true) {
        const result = this.likesRepository.merge(like, {
          like: false,
        });

        return this.likesRepository.save(result);
      } else {
        const result = this.likesRepository.merge(like, {
          like: true,
        });

        return this.likesRepository.save(result);
      }
    }
  }
}
