import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStoryBookInput } from './create-storyBook.input';

@InputType()
export class UpdateStoryBookInput extends PartialType(CreateStoryBookInput) {}
