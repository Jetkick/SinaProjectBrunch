import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { StoriesService } from '../stories/stories.service';
import { Story } from '../stories/entities/story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment, //
      Story,
    ]),
  ],
  providers: [
    CommentsResolver, //
    CommentsService,
    StoriesService,
  ],
})
export class CommentsModule {}
