import { Module } from '@nestjs/common';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Story } from '../stories/entities/story.entity';
import { StoriesService } from '../stories/stories.service';
import { StoryBooksService } from '../storyBooks/storyBooks.service';
import { StoryBook } from '../storyBooks/entities/storyBook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Like, //
      Story,
      StoryBook,
    ]),
  ],
  providers: [
    LikesResolver, //
    LikesService,
    StoriesService,
    StoryBooksService,
  ],
})
export class LikesModule {}
