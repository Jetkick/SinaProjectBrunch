import { Module } from '@nestjs/common';
import { SignUpsResolver } from './signUps.resolver';
import { SignUpsService } from './signups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/signUp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    SignUpsResolver, //
    SignUpsService,
  ],
  exports: [
    SignUpsService, //
  ],
})
export class SignUpsModule {}
