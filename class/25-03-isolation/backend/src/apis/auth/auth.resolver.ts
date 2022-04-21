import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
@Resolver()
export class AuthResovler {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    //1. 로그인(이메일과, 비밀번호가 일치하는 유저 찾기)
    const user = await this.userService.findOne({ email });
    //2. 일치하는 유저가 없으면 에러 던지기
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 이메일 입니다');
    //3. 일치하는 유저가 있지만 암호가 틀렷다면 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('암호가 일치하지 않습니다');

    //4. refreshToken(=JWT) 만들어서 프런트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    //5. 일치하는 유저가 있으면? accessToken 만들기 (JWT)토큰을 만들어서 프런트 엔드에 주기
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
