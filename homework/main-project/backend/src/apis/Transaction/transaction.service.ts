import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Used_car } from '../used_cars/entities/used_car.entity';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/transaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Used_car)
    private readonly usedCarRepository: Repository<Used_car>,

    private readonly iamportService: IamportService,

    private readonly connection: Connection,
  ) {}

  async prepare({ merchant_uid, amount, currentUser }) {
    const accessToken = await this.iamportService.getAccessToken();

    const prepareComplete = await this.iamportService.paymentPrepare({
      merchant_uid,
      accessToken,
      amount,
    });
  }

  async create({ impUid, amount, currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();

    console.log('===============');
    console.log('π', accessToken);
    console.log('===============');

    const from_Import = await this.iamportService.checkImpUid({
      accessToken,
      impUid,
    });

    console.log('+++++++++');
    console.log(from_Import); //μμν¬νΈ μ¬μ΄νΈμμ κ°μ Έμ¨ μ λ³΄λ€
    console.log('+++++++++');

    const merchant_uid_fromImport = from_Import.merchant_uid;

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const used_car = await queryRunner.manager.findOne(
        Used_car,
        { car_id: merchant_uid_fromImport },
        { lock: { mode: 'pessimistic_write' } },
      );

      if (used_car.is_sold === true)
        throw new UnprocessableEntityException('μ΄λ―Έ κ΅¬λ§€λ μνμλλ€');

      if (from_Import.amount !== amount) {
        await this.iamportService.cancelOrderWithUid({ accessToken, impUid });
        throw new UnprocessableEntityException(
          'μ§λΆν κ°κ²©κ³Ό, μλμ°¨μ κ°κ²©μ΄ μΌμΉνμ§ μμ΅λλ€',
        );
      }
      // pointTransactionTable μ κ±°λ κΈ°λ‘ 1μ μμ±
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        used_car: merchant_uid,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);
      //2. μ μ  μ λ³΄ κ°μ Έμ€κΈ°
      //const user = await this.userRepository.findOne({ id: currentUser.id });
      //3. μλμ°¨ μ λ³΄ κ°μ Έμ€κΈ°

      const updateUsedCar = this.usedCarRepository.create({
        ...used_car, //μ°Ύμμ¬μ¬λ
        is_sold: true, // λ°κΏ λ΄μ©
      });
      await queryRunner.manager.save(updateUsedCar);
      await queryRunner.commitTransaction();
      //4. μ΅μ’κ²°κ³Ό νλ°νΈμλμ λλ €μ£ΌκΈ°
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async delete({ currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();
    //μ΄ κ³Όμ μμ μμ°Ύμμ§λ©΄ μ¬κΈ°μ
    const from_Import = await this.iamportService.checkMerchantUid({
      accessToken,
      merchant_uid,
    });
    console.log('π₯°', from_Import);

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); //μ°κ²°
    //transaction μμ
    await queryRunner.startTransaction('SERIALIZABLE'); // μμ

    try {
      const userInfo = await queryRunner.manager.findOne(
        User,
        { email: currentUser.email },
        { lock: { mode: 'pessimistic_write' } },
      );

      const pointTransaction = await queryRunner.manager.findOne(
        PointTransaction,
        { where: { used_car: merchant_uid }, relations: ['user'] },
      );
      console.log('π', userInfo);
      console.log('π ', pointTransaction);
      if (userInfo.id !== pointTransaction.user.id)
        throw new UnprocessableEntityException('κ΅¬λ§€νμ  νλͺ©μ΄ μλλλ€.');

      console.log('π', pointTransaction);
      if (pointTransaction.status === 'CANCEL')
        throw new UnprocessableEntityException('μ΄λ―Έ μ·¨μλ μνμλλ€.');

      await this.iamportService.cancelOrderWithMuid({
        accessToken,
        merchant_uid,
      });

      const used_car = await queryRunner.manager.findOne(
        Used_car, //
        { car_id: merchant_uid },
        { lock: { mode: 'pessimistic_write' } },
      );

      const updateCar = this.usedCarRepository.create({
        ...used_car, //μ°Ύμμ¬μ¬λ μμ΄λ
        is_sold: false, // λ°κΏ λ΄μ©
      });
      await queryRunner.manager.save(updateCar);

      const result = await this.pointTransactionRepository.create({
        impUid: from_Import.imp_uid,
        amount: from_Import.amount,
        used_car: merchant_uid,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });

      await queryRunner.manager.save(result);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //μ°κ²°ν΄μ 
      await queryRunner.release(); //μ°κ²° ν΄μ λ₯Ό ν΄μ€μΌ νλ€.
    }
  }
}
