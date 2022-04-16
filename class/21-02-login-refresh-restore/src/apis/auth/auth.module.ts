import { Module } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthResovler } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    JwtRefreshStrategy,
    AuthResovler, //
    AuthService,
    UserService,
  ],
})
export class AuthModule {}
