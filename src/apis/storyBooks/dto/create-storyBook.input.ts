import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoryBookInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  titleCover: string;

  @Field(() => [String], { nullable: true })
  titleTag: string[];

  @Field(() => [String], { nullable: true })
  state: string[];

  @Field(() => [String])
  introduction: string[];

  @Field(() => String)
  brunchBookIntroduction: string;

  @Field(() => [String], { nullable: true })
  brunchBookTag: string[];
}
