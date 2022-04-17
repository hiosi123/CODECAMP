import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BrandModule } from './apis/brand/brand.module';
import { CarKindModule } from './apis/carKind/carKind.module';
import { CarModelModule } from './apis/carModel/carModel.module';
import { DealerModule } from './apis/dealer/dealer.module';
import { DriveMethodModule } from './apis/driveMethod/driveMethod.module';
import { FuelModule } from './apis/fuel/fuel.module';

import { GearModule } from './apis/gearKind/gearkind.module';
import { IamportService } from './apis/iamport/iamport.service';
import { PointTransactionModule } from './apis/Transaction/transaction.module';
import { Used_carModule } from './apis/used_cars/used_car.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    BrandModule,
    DealerModule,
    PointTransactionModule,
    Used_carModule,
    CarModelModule,
    CarKindModule,
    DriveMethodModule,
    FuelModule,
    GearModule,
    IamportService,
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
