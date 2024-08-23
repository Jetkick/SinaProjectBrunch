import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoriesService } from './stories.service';
import { Story } from './entities/story.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';

@Resolver()
export class StoriesResolver {
  constructor(
    private readonly storiesService: StoriesService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Story)
  createStory(
    @Args('createStoryInput') createStoryInput: CreateStoryInput, //
    @Context() context: IContext,
  ): Promise<Story> {
    return this.storiesService.createStory({
      createStoryInput,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Story)
  updateStory(
    @Args('storyId') storyId: string,
    @Args('updateStoryInput') updateStoryInput: UpdateStoryInput, //
  ): Promise<Story> {
    return this.storiesService.updateStory({
      storyId,
      updateStoryInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteStory(
    @Args('storyId') storyId: string, //
  ): Promise<boolean> {
    return this.storiesService.deleteStory({
      storyId,
    });
  }

  @Query(() => [Story])
  fetchStories(
    @Args('userId') userId: string, //
  ): Promise<Story[]> {
    return this.storiesService.fetchStories({ userId });
  }

  @Query(() => Story)
  fetchStory(
    @Args('storyId') storyId: string, //
  ): Promise<Story> {
    return this.storiesService.fetchStory({ storyId });
  }
}
