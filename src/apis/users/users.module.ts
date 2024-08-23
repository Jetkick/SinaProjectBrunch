import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { SignUpsModule } from '../signUp/signUps.module';
import { JwtAccessStrategy } from '../auth/startegies/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    SignUpsModule,
  ],
  providers: [
    JwtAccessStrategy, //
    UsersResolver, //
    UsersService,
  ],
  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
