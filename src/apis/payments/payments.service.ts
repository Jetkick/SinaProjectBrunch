import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import { IamportService } from '../iamport/iamport.service';
import {
  IPaymentsServiceCancel,
  IPaymentsServiceCheckAlreadyCanceled,
  IpaymentsServiceCheckDuplication,
  IpaymentsServiceCheckHasCancelablePoint,
  IPaymentsServiceCreate,
  IPaymentsServiceCreateForPayment,
  IPaymentsServiceFindByImpUidAndUser,
  IPaymentsServiceFindOneByImpUid,
} from './interfaces/payments-service.interface';
import { User } from '../signUp/entities/signUp.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>, //

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly iamportService: IamportService,

    private readonly dataSource: DataSource,
  ) {}

  async findOneByImpUid({
    impUid,
  }: IPaymentsServiceFindOneByImpUid): Promise<Payment> {
    return await this.paymentsRepository.findOne({
      where: { impUid: impUid },
    });
  }

  async checkDuplication({
    impUid,
  }: IpaymentsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    impUid,
    point,
    user,
    createPaymentInput,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const userId = await queryRunner.manager.findOne(User, {
        lock: { mode: 'pessimistic_write' },
        where: { id: user.id },
      });

      const payment = this.paymentsRepository.create({
        impUid,
        ...createPaymentInput,
        status,
        userId: userId,
      });

      await queryRunner.manager.save(payment);

      const updateUser = this.usersRepository.merge(userId, {
        point: userId.point + point,
      });

      await queryRunner.manager.save(updateUser);

      await queryRunner.commitTransaction();

      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createForPayment({
    impUid,
    point,
    user,
    createPaymentInput,
  }: IPaymentsServiceCreateForPayment): Promise<Payment> {
    await this.iamportService.checkPaid({ impUid, point });

    await this.checkDuplication({ impUid });
    return this.create({ impUid, point, user, createPaymentInput });
  }

  async findByImpUidAndUser({
    impUid,
    user,
  }: IPaymentsServiceFindByImpUidAndUser): Promise<Payment[]> {
    const userId = user.id;
    return await this.paymentsRepository.find({
      where: { impUid, userId: { id: userId } },
      relations: ['userId'],
    });
  }

  checkAlreadyCanceled({
    payments,
  }: IPaymentsServiceCheckAlreadyCanceled): void {
    const canceledPayments = payments.filter(
      (el) => el.status === PAYMENT_STATUS_ENUM.CANCEL,
    );
    if (canceledPayments.length)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  checkHasCancelablePoint({
    payments,
  }: IpaymentsServiceCheckHasCancelablePoint): void {
    const paidPayments = payments.filter(
      (el) => el.status === PAYMENT_STATUS_ENUM.PAYMENT,
    );

    if (!paidPayments.length)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니당,');

    if (paidPayments[0].userId.point < paidPayments[0].price)
      throw new UnprocessableEntityException('포인트가 부족합니다');
  }

  async cancel({
    impUid,
    user,
    createPaymentInput,
  }: IPaymentsServiceCancel): Promise<Payment> {
    const payments = await this.findByImpUidAndUser({ impUid, user });

    console.log(payments);

    this.checkAlreadyCanceled({ payments });

    this.checkHasCancelablePoint({ payments });

    const canceledPoint = await this.iamportService.cancel({ impUid });

    return this.create({
      impUid,
      point: -canceledPoint,
      user,
      createPaymentInput,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
  }
}
