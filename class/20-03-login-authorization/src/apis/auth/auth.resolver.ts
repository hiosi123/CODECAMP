import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
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
    //4. 일치하는 유저가 있으면? accessToken 만들기 (JWT)토큰을 만들어서 프런트 엔드에 주기
    return this.authService.getAccessToken({ user });
  }
}
