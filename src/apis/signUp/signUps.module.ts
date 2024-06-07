import { Module } from '@nestjs/common';
import { SignUpsResolver } from './signUps.resolver';
import { SignUpsService } from './signups.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //
    ]),
  ],
  providers: [
    SignUpsResolver, //
    SignUpsService,
  ],
  exports: [],
})
export class SignUpsModule {}
