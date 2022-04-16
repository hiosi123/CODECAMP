import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';
import { Strategy } from 'passport-google-oauth20';

//google 로그인용 passport
//yarn add passport-google-oauth20
@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      //검중부, Bearer 뺴고 넣어야함, 내장 되어있음 .fromauthheadera
      clientID:
        '552027570615-lehs5mq4sok5e3s4h9r3l6a3hacdm8uj.apps.googleusercontent.com', //구굴에서 들고오셈
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'], //사이트마다 다르다
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: '1111',
      name: profile.displayName, //req.user라는 이름에  contest 로 들어감
      age: 0,
      phone: '01020311883',
      address: '구로구',
      provider: profile.provider,
    };
  }
}
