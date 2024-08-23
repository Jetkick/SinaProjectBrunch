import { IAuthUser } from 'src/common/interfaces/context';
import { CreatePaymentInput } from '../dto/create-payment.input';
import { Payment, PAYMENT_STATUS_ENUM } from '../entities/payment.entity';

export interface IPaymentsServiceFindOneByImpUid {
  impUid: string;
}

export interface IpaymentsServiceCheckDuplication {
  impUid: string;
}

export interface IPaymentsServiceCreate {
  impUid: string;
  point: number;
  user: IAuthUser['user'];
  createPaymentInput: CreatePaymentInput;
  status?: PAYMENT_STATUS_ENUM;
}

export interface IPaymentsServiceCreateForPayment {
  impUid: string;
  point: number;
  user: IAuthUser['user'];
  createPaymentInput: CreatePaymentInput;
}

export interface IPaymentsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPaymentsServiceCheckAlreadyCanceled {
  payments: Payment[];
}

export interface IpaymentsServiceCheckHasCancelablePoint {
  payments: Payment[];
}

export interface IPaymentsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
  createPaymentInput: CreatePaymentInput;
}
