import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/common/interfaces/context';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.usersService.login({ email, password, context });
  }

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.usersService.restoreAccessToken({ user: context.req.user });
  }
}
