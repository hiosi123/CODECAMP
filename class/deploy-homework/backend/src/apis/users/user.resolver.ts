import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';

import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    return this.userService.create({ email, hashedPassword, name, age });
  }

  @UseGuards(GqlAuthAccessGuard) //가드의 이름 'aaa' - 내가 정해주면 됨
  @Query(() => User)
  fetchUser(
    //@Args("writer")
    @CurrentUser() currentUser: ICurrentUser, //우리가 만든 데코레이터 - context 있는 데이터를 뽑아오기위함
  ) {
    console.log('currentUser는?', currentUser);
    console.log('fetchUser 실행 완료 !!!');
    return currentUser;
  }
}
