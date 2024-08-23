import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  cheer: string;
}
