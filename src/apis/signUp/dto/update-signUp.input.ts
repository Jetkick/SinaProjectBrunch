import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-signUp.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
