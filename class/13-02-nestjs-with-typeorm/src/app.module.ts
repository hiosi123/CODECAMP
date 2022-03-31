import { Module } from '@nestjs/common';
import { BoardModule } from './apis/boards/boards.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
