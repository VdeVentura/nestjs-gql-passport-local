import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/users/user.type';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginInput } from './login.input';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(returns => UserType)
  placholder() {
    return {
      userId: 1,
      username: 'john',
      password: 'changeme',
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => UserType)
  async login(@CurrentUser() user: UserType, @Args('loginInput') loginInput: LoginInput): Promise<UserType> {
    console.log('\x1b[32m %c============================== \x1b[0m', 'color: green');
    console.log('[auth.resolver --> user]', user);
    console.log('\x1b[32m %c============================== \x1b[0m', 'color: green');
    return user;
  }
}
