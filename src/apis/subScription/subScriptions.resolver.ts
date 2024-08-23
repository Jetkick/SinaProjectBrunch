import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SubScriptionsService } from './subScriptions.service';
import { SubScription } from './entities/subScription.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class SubScriptionsResolver {
  constructor(
    private readonly subScriptionsService: SubScriptionsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => SubScription)
  createSubScription(
    @Args('subScriptionUser') subscriptionUser: string, //
    @Context() context: IContext,
  ): Promise<SubScription> {
    return this.subScriptionsService.createSubScription({
      subscriptionUser,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => SubScription)
  cancelSubScription(
    @Args('subScriptionUser') subscriptionUser: string, //
    @Context() context: IContext,
  ): Promise<SubScription> {
    return this.subScriptionsService.cancelSubScription({
      subscriptionUser,
      user: context.req.user,
    });
  }
}
