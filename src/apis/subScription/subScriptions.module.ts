import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubScriptionsResolver } from './subScriptions.resolver';
import { SubScriptionsService } from './subScriptions.service';
import { SubScription } from './entities/subScription.entity';
import { SignUpsModule } from '../signUp/signUps.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubScription, //
    ]),
    SignUpsModule,
  ],
  providers: [
    SubScriptionsResolver, //
    SubScriptionsService,
  ],
})
export class SubScriptionsModule {}
