import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/signUp/entities/signUp.entity';
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
export class StoryBook {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  titleCover: string;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  titleTag: string[];

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  state: string[];

  @Column('simple-array')
  @Field(() => [String])
  introduction: string[];

  @Column({ type: 'varchar', length: 1000 })
  @Field(() => String)
  brunchBookIntroduction: string;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  brunchBookTag: string[];

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  storyId: string[];

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
