import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/signUp/entities/signUp.entity';
import { Story } from 'src/apis/stories/entities/story.entity';
import { StoryBook } from 'src/apis/storyBooks/entities/storyBook.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  like: boolean;

  @ManyToOne(() => Story, (story) => story.id)
  @Field(() => Story)
  storyId: Story;

  @ManyToOne(() => StoryBook)
  @Field(() => StoryBook)
  storyBookId: StoryBook;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
