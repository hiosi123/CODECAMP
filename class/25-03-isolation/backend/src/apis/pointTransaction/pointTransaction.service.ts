import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
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

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); //연결
    //transaction 시작
    await queryRunner.startTransaction(); // 시작
    //3중에 하나라도 실패하면 rollback 되돌리기
    try {
      // pointTransactionTable 에 거래 기록 1을 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);
      //2. 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({ id: currentUser.id });
      //3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id }, //찾아올사람
      //   { point: user.point + amount }, // 바꿀 내용
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser); // this.userRepository.save(updatedUser);

      //commit 성공 확정!!
      await queryRunner.commitTransaction();
      //4. 최종결과 프런트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // rollback 되돌리기!!
      await queryRunner.rollbackTransaction();
    } finally {
      //연결해제
      await queryRunner.release(); //연결 해제를 해줘야 한다.
    }
  }
}
