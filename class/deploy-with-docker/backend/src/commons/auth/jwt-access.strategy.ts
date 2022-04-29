import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //검중부, Bearer 뺴고 넣어야함, 내장 되어있음 .fromauthheadera
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
    });
  }

  validate(payload) {
    // 실패 또는 성공여부를 알려줌
    //검증완료되면 실행
    console.log(payload);
    return {
      id: payload.sub, //리턴이 된거임 context 라는 곳으로
      email: payload.email,
    };
  }
}
