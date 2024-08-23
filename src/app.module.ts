import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpsModule } from './apis/signUp/signUps.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { SubScriptionsModule } from './apis/subScription/subScriptions.module';
import { StoriesModule } from './apis/stories/stories.module';
import { CommentsModule } from './apis/comments/comments.module';
import { LikesModule } from './apis/likes/likes.module';
import { StoryBooksModule } from './apis/storyBooks/storyBooks.module';
import { PaymentsModule } from './apis/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    LikesModule,
    PaymentsModule,
    SignUpsModule,
    StoriesModule,
    StoryBooksModule,
    SubScriptionsModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
