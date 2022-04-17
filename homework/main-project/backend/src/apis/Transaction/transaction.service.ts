import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
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
    console.log('🍎', accessToken);
    console.log('===============');

    const from_Import = await this.iamportService.checkImpUid({
      accessToken,
      impUid,
    });

    console.log('+++++++++');
    console.log(from_Import); //아임포트 사이트에서 가져온 정보들
    console.log('+++++++++');

    const merchant_uid_fromImport = from_Import.merchant_uid;

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid_fromImport,
    });

    if (used_car.is_sold === true)
      throw new UnprocessableEntityException('이미 구매된 상품입니다');

    if (from_Import.amount !== amount) {
      await this.iamportService.cancelOrderWithUid({ accessToken, impUid });
      throw new UnprocessableEntityException(
        '지불한 가격과, 자동차의 가격이 일치하지 않습니다',
      );
    }
    // pointTransactionTable 에 거래 기록 1을 생성
    const pointTransaction = await this.pointTransactionRepository.save({
      impUid: impUid,
      amount: amount,
      used_car: merchant_uid,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    //2. 유저 정보 가져오기
    //const user = await this.userRepository.findOne({ id: currentUser.id });
    //3. 자동차 정보 가져오기

    this.usedCarRepository.update(
      { car_id: used_car.car_id }, //찾아올사람
      { is_sold: true }, // 바꿀 내용
    );
    //4. 최종결과 프런트엔드에 돌려주기
    return pointTransaction;
  }

  async delete({ currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();
    //이 과정에서 안찾아지면 사기임
    const from_Import = await this.iamportService.checkMerchantUid({
      accessToken,
      merchant_uid,
    });
    console.log('🥰', from_Import);

    const pointTransaction = await this.pointTransactionRepository.findOne({
      where: { used_car: merchant_uid },
    });

    console.log('🍌', pointTransaction);
    if (pointTransaction.status === 'CANCEL')
      throw new UnprocessableEntityException('이미 취소된 상품입니다.');

    await this.iamportService.cancelOrderWithMuid({
      accessToken,
      merchant_uid,
    });

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid,
    });

    await this.usedCarRepository.update(
      { car_id: used_car.car_id }, //찾아올사람 아이디
      { is_sold: false }, // 바꿀 내용
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
