import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  profileImage: string;

  @Field(() => [String], { nullable: true })
  userTag: string[];

  @Field(() => String, { nullable: true })
  info: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
