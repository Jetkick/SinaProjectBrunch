import { Module } from '@nestjs/common';
import { StoryBooksResolver } from './storyBooks.resolver';
import { StoryBooksService } from './storyBooks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryBook } from './entities/storyBook.entity';
import { StoriesService } from '../stories/stories.service';
import { Story } from '../stories/entities/story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoryBook, //
      Story,
    ]),
  ],
  providers: [
    StoryBooksResolver, //
    StoryBooksService,
    StoriesService,
  ],
})
export class StoryBooksModule {}
