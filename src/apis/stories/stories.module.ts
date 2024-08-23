import { Module } from '@nestjs/common';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './stories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Story, //
    ]),
  ],
  providers: [
    StoriesResolver, //
    StoriesService,
  ],
})
export class StoriesModule {}
