import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { CarKindModule } from './apis/carKind/carKind.module';
import { DriveMethodModule } from './apis/driveMethod/driveMethod.module';
import { FuelModule } from './apis/fuel/fuel.module';

import { GearModule } from './apis/gearKind/gearkind.module';
import { Used_carModule } from './apis/used_cars/used_car.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    Used_carModule,
    CarKindModule,
    DriveMethodModule,
    FuelModule,
    GearModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**/*.entity.*'], //각 경로 설정
      synchronize: true,
      logging: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
