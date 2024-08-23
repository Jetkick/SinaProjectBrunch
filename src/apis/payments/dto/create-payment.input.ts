import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  kind: string;

  @Field(() => String)
  paymentMethod: string;

  @Field(() => String)
  paymentType: string;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  paymentConditions: boolean;
}
