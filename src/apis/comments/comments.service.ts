import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICommentsServiceCreate,
  ICommentsServiceDelete,
  ICommentsServiceFetchComment,
  ICommentsServiceFindOneByCommentId,
  ICommentsServiceUpdate,
} from './interfaces/comments-service.interface';
import { StoriesService } from '../stories/stories.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //

    private readonly storiesService: StoriesService,
  ) {}

  async findOneByCommentId({
    commentId,
  }: ICommentsServiceFindOneByCommentId): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });

    if (!comment)
      throw new UnprocessableEntityException('댓글을 찾을 수 없습니다!');

    return comment;
  }

  async fetchComments({
    storyId,
  }: ICommentsServiceFetchComment): Promise<Comment[]> {
    const comments = await this.commentsRepository
      .createQueryBuilder('comment')
      .select('*')
      .where('comment.storyId = :storyId', { storyId })
      .limit(10)
      .getRawMany();

    if (!comments)
      throw new UnprocessableEntityException('댓글들을 찾을 수 없습니다!');

    return comments;
  }

  async createComment({
    storyId,
    createCommentInput,
    user,
  }: ICommentsServiceCreate): Promise<Comment> {
    const storyIdId = await this.storiesService.findOneByStoryId({ storyId });

    const result = this.commentsRepository.create({
      ...createCommentInput,
      userId: user.validateUser,
      storyId: storyIdId,
    });

    return this.commentsRepository.save(result);
  }

  async updateComment({
    storyId,
    commentId,
    updateCommentInput,
  }: ICommentsServiceUpdate): Promise<Comment> {
    await this.storiesService.findOneByStoryId({ storyId });

    const comment = await this.findOneByCommentId({ commentId });

    const result = this.commentsRepository.merge(comment, {
      ...updateCommentInput,
    });

    return this.commentsRepository.save(result);
  }

  async deleteComment({
    storyId,
    commentId,
  }: ICommentsServiceDelete): Promise<boolean> {
    await this.storiesService.findOneByStoryId({ storyId });

    await this.findOneByCommentId({ commentId });

    const result = await this.commentsRepository.softDelete({
      id: commentId,
    });

    return result.affected ? true : false;
  }
}
