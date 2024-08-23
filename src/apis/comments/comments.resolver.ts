import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver()
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  createComment(
    @Args('storyId') storyId: string, //
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Context() context: IContext,
  ): Promise<Comment> {
    return this.commentsService.createComment({
      storyId,
      createCommentInput,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  updateComment(
    @Args('storyId') storyId: string, //
    @Args('commentId') commentId: string,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.updateComment({
      storyId,
      commentId,
      updateCommentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteComment(
    @Args('storyId') storyId: string, //
    @Args('commentId') commentId: string,
  ): Promise<boolean> {
    return this.commentsService.deleteComment({
      storyId,
      commentId,
    });
  }

  @Query(() => [Comment])
  fetchComments(
    @Args('storyId') storyId: string, //
  ): Promise<Comment[]> {
    return this.commentsService.fetchComments({ storyId });
  }
}
