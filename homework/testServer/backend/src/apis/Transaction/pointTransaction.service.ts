import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Used_car } from '../used_cars/entities/used_car.entity';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

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
  ) {}

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

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid_fromImport,
    });

    if (used_car.is_sold === true)
      throw new UnprocessableEntityException('μ΄λ―Έ κ΅¬λ§€λ μνμλλ€');

    if (from_Import.amount !== amount)
      throw new UnprocessableEntityException(
        'μ§λΆν κ°κ²©κ³Ό, μλμ°¨μ κ°κ²©μ΄ μΌμΉνμ§ μμ΅λλ€',
      );

    // pointTransactionTable μ κ±°λ κΈ°λ‘ 1μ μμ±
    const pointTransaction = await this.pointTransactionRepository.save({
      impUid: impUid,
      amount: amount,
      used_car: merchant_uid,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    //2. μ μ  μ λ³΄ κ°μ Έμ€κΈ°
    //const user = await this.userRepository.findOne({ id: currentUser.id });
    //3. μλμ°¨ μ λ³΄ κ°μ Έμ€κΈ°

    this.usedCarRepository.update(
      { car_id: used_car.car_id }, //μ°Ύμμ¬μ¬λ
      { is_sold: true }, // λ°κΏ λ΄μ©
    );
    //4. μ΅μ’κ²°κ³Ό νλ°νΈμλμ λλ €μ£ΌκΈ°
    return pointTransaction;
  }

  async delete({ currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();
    //μ΄ κ³Όμ μμ μμ°¨μμ§λ©΄ μ¬κΈ°μ
    const from_Import = await this.iamportService.checkMerchantUid({
      accessToken,
      merchant_uid,
    });
    console.log('π₯°', from_Import);
    const getCar = from_Import.merchant_uid;

    const pointTransaction = await this.pointTransactionRepository.findOne({
      where: { used_car: getCar },
    });

    console.log('π', pointTransaction);
    if (pointTransaction.status === 'CANCEL')
      throw new UnprocessableEntityException('μ΄λ―Έ μ·¨μλ μνμλλ€.');

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid,
    });

    await this.usedCarRepository.update(
      { car_id: used_car.car_id }, //μ°Ύμμ¬μ¬λ
      { is_sold: false }, // λ°κΏ λ΄μ©
    );

    const result = await this.pointTransactionRepository.save({
      impUid: from_Import.imp_uid,
      amount: from_Import.amount,
      used_car: merchant_uid,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return result;
  }
}
