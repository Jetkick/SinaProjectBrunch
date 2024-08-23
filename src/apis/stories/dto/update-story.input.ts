import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStoryInput } from './create-story.input';

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {}
