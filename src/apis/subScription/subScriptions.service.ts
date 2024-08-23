import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubScription } from './entities/subScription.entity';
import { Repository } from 'typeorm';
import {
  ISubScriptionsServiceCancel,
  ISubScriptionsServiceCreate,
  ISubScriptionsServiceFindOneBySubScriptionUserId,
} from './interfaces/subScriptions-service.interface';
import { SignUpsService } from '../signUp/signups.service';

@Injectable()
export class SubScriptionsService {
  constructor(
    @InjectRepository(SubScription)
    private readonly subScriptionsRepository: Repository<SubScription>, //

    private readonly signUpsService: SignUpsService,
  ) {}

  async findOneBySubScriptionUserId({
    userId,
    subScriptionUserId,
  }: ISubScriptionsServiceFindOneBySubScriptionUserId): Promise<SubScription> {
    return await this.subScriptionsRepository
      .createQueryBuilder('sub_scription')
      .select('*')
      .where('sub_scription.userId = :userId', { userId })
      .andWhere('sub_scription.subScriptionUserId = :subScriptionUserId', {
        subScriptionUserId,
      })
      .getRawOne();
  }

  async createSubScription({
    subscriptionUser,
    user,
  }: ISubScriptionsServiceCreate): Promise<SubScription> {
    const subScriptionUserId = await this.signUpsService.findOneByUserId({
      userId: subscriptionUser,
    });

    const validate = await this.findOneBySubScriptionUserId({
      userId: user.validateUser.id,
      subScriptionUserId: subScriptionUserId.id,
    });

    if (validate === undefined) {
      const result = this.subScriptionsRepository.create({
        name: subScriptionUserId.name,
        profileImage: subScriptionUserId.profileImage,
        info: subScriptionUserId.info,
        subScription: true,
        subScriptionUser: subScriptionUserId,
        userId: user.validateUser,
      });

      return this.subScriptionsRepository.save(result);
    } else if (validate.subScription == false) {
      const result = this.subScriptionsRepository.merge(validate, {
        subScription: true,
      });

      return this.subScriptionsRepository.save(result);
    } else {
      throw new UnprocessableEntityException('이미 구독하셨습니다!');
    }
  }

  async cancelSubScription({
    subscriptionUser,
    user,
  }: ISubScriptionsServiceCancel): Promise<SubScription> {
    const subScriptionUserId = await this.signUpsService.findOneByUserId({
      userId: subscriptionUser,
    });

    const cancelSubScription = await this.findOneBySubScriptionUserId({
      userId: user.validateUser.id,
      subScriptionUserId: subScriptionUserId.id,
    });

    if (cancelSubScription.subScription == true) {
      const result = this.subScriptionsRepository.merge(cancelSubScription, {
        subScription: false,
      });

      return this.subScriptionsRepository.save(result);
    } else if (cancelSubScription.subScription == false) {
      throw new UnprocessableEntityException('이미 구독을 취소하셨습니다!');
    }
  }
}
