import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoryBook } from './entities/storyBook.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { StoryBooksService } from './storyBooks.service';
import { IContext } from 'src/common/interfaces/context';
import { CreateStoryBookInput } from './dto/create-storyBook.input';
import { UpdateStoryBookInput } from './dto/update-storyBook.input';

@Resolver()
export class StoryBooksResolver {
  constructor(
    private readonly storyBooksService: StoryBooksService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => StoryBook)
  createStoryBook(
    @Args('createStoryBookInput') createStoryBookInput: CreateStoryBookInput,
    @Args('storyId', { nullable: true }) storyId: string,
    @Context() context: IContext,
  ): Promise<StoryBook> {
    return this.storyBooksService.createStoryBook({
      createStoryBookInput,
      storyId,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => StoryBook)
  updateStoryBook(
    @Args('updateStoryBookInput') updateStoryBookInput: UpdateStoryBookInput,
    @Args('storyId') storyId: string,
    @Args('storyBookId') storyBookId: string,
    @Context() context: IContext,
  ): Promise<StoryBook> {
    return this.storyBooksService.updateStoryBook({
      updateStoryBookInput,
      storyId,
      storyBookId,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteStroyBook(
    @Args('storyBookId') storyBookId: string, //
  ): Promise<boolean> {
    return this.storyBooksService.deleteStoryBook({ storyBookId });
  }

  @Query(() => StoryBook)
  fetchStoryBook(
    @Args('storyBookId') storyBookId: string, //
  ): Promise<StoryBook> {
    return this.storyBooksService.fetchStoryBook({ storyBookId });
  }
}
