import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from './entities/pointTransaction.entity';
export declare class PointTransactionService {
    private readonly pointTransactionRepository;
    private readonly userRepository;
    constructor(pointTransactionRepository: Repository<PointTransaction>, userRepository: Repository<User>);
    create({ impUid, amount, currentUser }: {
        impUid: any;
        amount: any;
        currentUser: any;
    }): Promise<{
        impUid: any;
        amount: any;
        user: any;
        status: POINT_TRANSACTION_STATUS_ENUM;
    } & PointTransaction>;
}
