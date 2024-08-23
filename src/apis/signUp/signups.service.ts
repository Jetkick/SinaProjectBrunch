import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/signUp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ISignUpsServiceCreate,
  ISignUpsServiceDelete,
  ISignUpsServiceFetchUser,
  ISignUpsServiceFindOneByEmail,
  ISignUpsServiceFindOneByUserId,
  ISignUpsServiceUpdate,
} from './interfaces/signUps-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  async findOneByEmail({
    email,
  }: ISignUpsServiceFindOneByEmail): Promise<User> {
    const userEmail = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (userEmail) {
      return userEmail;
    } else if (userEmail === undefined) {
      return userEmail;
    }
  }

  async findOneByUserId({
    userId,
  }: ISignUpsServiceFindOneByUserId): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('*')
      .where('user.id = :userId', { userId })
      .getRawOne();

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다!');

    return user;
  }

  async fetchUser({ email }: ISignUpsServiceFetchUser): Promise<string> {
    const result = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!result)
      throw new UnprocessableEntityException('가입되지 않은 유저입니다!');

    return result.email;
  }

  async createUser({ createUserInput }: ISignUpsServiceCreate): Promise<User> {
    const { email } = createUserInput;

    const user = await this.findOneByEmail({ email });

    if (user) throw new ConflictException('이미 등록된 이메일 입니다!');

    if (createUserInput.password) {
      createUserInput.password = await bcrypt.hash(createUserInput.password, 8);
    }

    const result = this.usersRepository.create({
      ...createUserInput, //
    });

    return await this.usersRepository.save(result);
  }

  async updateUser({
    updateUserInput,
    user,
  }: ISignUpsServiceUpdate): Promise<User> {
    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(updateUserInput.password, 8);
    }

    const result = this.usersRepository.merge(user.validateUser, {
      ...updateUserInput,
    });

    return this.usersRepository.save(result);
  }

  async deleteUser({ user }: ISignUpsServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({
      id: user.validateUser.id,
    });
    return result.affected ? true : false;
  }
}
