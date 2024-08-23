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
export class SubScription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field(() => String, { nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  info: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  subScription: boolean;

  @ManyToOne(() => User)
  @Field(() => User)
  subScriptionUser: User;

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
