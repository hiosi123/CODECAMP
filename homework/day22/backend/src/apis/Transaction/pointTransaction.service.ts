import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
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
  ) {}

  async create({ impUid, amount, currentUser, merchant_uid }) {
    const imp_uid_token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '6436672414334897', // REST API키
        imp_secret:
          '1750f6c0346700ba0bd71145471462743354710e00673094edbfa720e1825da9d8709baee6b86bb0', // REST API Secret
      },
    });

    console.log('===============');
    console.log('🍎', imp_uid_token.data.response.access_token);
    console.log('===============');

    const auth = imp_uid_token.data.response.access_token;

    const get_imp_uid = await axios({
      url: `https://api.iamport.kr/payments/${impUid}`,
      method: 'get', // GET method
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${auth}`, // 발행된 액세스 토큰
      },
    });

    console.log('+++++++++');
    console.log(get_imp_uid);
    console.log('+++++++++');

    const FromIMPORT = get_imp_uid.data.response.imp_uid;

    if (impUid !== FromIMPORT)
      throw new UnprocessableEntityException('impUid 가 일치하지 않습니다.');

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid,
    });
    if (used_car.is_sold === true)
      throw new UnprocessableEntityException('이미 구매된 상품입니다');

    if (used_car.price !== amount)
      throw new UnprocessableEntityException(
        '요청한 가격과, 자동차의 가격이 일치하지 않습니다',
      );

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

  async delete({ currentUser, merchant_uid, amount }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      where: { used_car: merchant_uid },
    });
    console.log('🍌', pointTransaction);
    if (pointTransaction.status === 'CANCEL')
      throw new UnprocessableEntityException('이미 취소된 상품입니다.');

    const imp_uid_token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '6436672414334897', // REST API키
        imp_secret:
          '1750f6c0346700ba0bd71145471462743354710e00673094edbfa720e1825da9d8709baee6b86bb0', // REST API Secret
      },
    });
    const auth = imp_uid_token.data.response.access_token;
    console.log('🍎', auth);
    const value = pointTransaction.impUid;

    const get_imp_uid = await axios({
      url: `https://api.iamport.kr/payments/cancel/`,
      method: 'post', // GET method
      data: { imp_uid: `${value}` },
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${auth}`, // 발행된 액세스 토큰
      },
    });

    const used_car = await this.usedCarRepository.findOne({
      car_id: merchant_uid,
    });
    await this.usedCarRepository.update(
      { car_id: used_car.car_id }, //찾아올사람
      { is_sold: false }, // 바꿀 내용
    );

    const result = await this.pointTransactionRepository.save({
      impUid: value,
      amount: amount,
      used_car: merchant_uid,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return result;
  }
}
