import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  subTitle: string;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => [String])
  tag: string[];
}
