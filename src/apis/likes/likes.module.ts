import { Module } from '@nestjs/common';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Story } from '../stories/entities/story.entity';
import { StoriesService } from '../stories/stories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Like, //
      Story,
    ]),
  ],
  providers: [
    LikesResolver, //
    LikesService,
    StoriesService,
  ],
})
export class LikesModule {}
