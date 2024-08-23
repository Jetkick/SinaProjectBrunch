import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/signUp/entities/signUp.entity';
import { Story } from 'src/apis/stories/entities/story.entity';
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
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 1000 })
  @Field(() => String)
  text: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String, { nullable: true })
  cheer: string;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;

  @ManyToOne(() => Story, (story) => story.id)
  @Field(() => Story)
  storyId: Story;

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
