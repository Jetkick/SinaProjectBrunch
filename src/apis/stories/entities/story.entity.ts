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
export class Story {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 300 })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
  subTitle: string;

  @Column({ type: 'varchar', length: 10000 })
  @Field(() => String)
  text: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @Field(() => String, { nullable: true })
  image: string;

  @Column('simple-array')
  @Field(() => [String])
  tag: string[];

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
