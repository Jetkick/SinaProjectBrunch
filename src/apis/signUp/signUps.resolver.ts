import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpsService } from './signups.service';
import { User } from './entities/signUp.entity';
import { CreateUserInput } from './dto/create-signUp.input';
import { UpdateUserInput } from './dto/update-signUp.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class SignUpsResolver {
  constructor(
    private readonly signUpsService: SignUpsService, //
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.signUpsService.createUser({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context: IContext,
  ): Promise<User> {
    return this.signUpsService.updateUser({
      updateUserInput,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteUser(
    @Context() context: IContext, //
  ): Promise<boolean> {
    return this.signUpsService.deleteUser({ user: context.req.user });
  }

  @Query(() => String)
  fetchUser(
    @Args('email') email: string, //
  ): Promise<string> {
    return this.signUpsService.fetchUser({ email });
  }
}
