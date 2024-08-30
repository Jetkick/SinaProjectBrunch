import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Like } from './entities/like.entity';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class LikesResolver {
  constructor(
    private readonly likesService: LikesService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Like)
  createLike(
    @Args('storyId', { nullable: true }) storyId: string, //
    @Args('storyBookId', { nullable: true }) storyBookId: string,
    @Context()
    context: IContext,
  ): Promise<Like> {
    return this.likesService.createLike({
      storyId,
      storyBookId,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Like)
  updateLike(
    @Args('storyId', { nullable: true }) storyId: string, //
    @Args('storyBookId', { nullable: true }) storyBookId: string,
    @Args('likeId') likeId: string,
    @Context() context: IContext,
  ): Promise<Like> {
    return this.likesService.updateLike({
      storyId,
      storyBookId,
      likeId,
      user: context.req.user,
    });
  }
}
