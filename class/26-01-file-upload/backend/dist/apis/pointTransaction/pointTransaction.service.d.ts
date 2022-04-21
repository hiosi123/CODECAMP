import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
export declare class PointTransactionService {
    private readonly pointTransactionRepository;
    private readonly userRepository;
    private readonly connection;
    constructor(pointTransactionRepository: Repository<PointTransaction>, userRepository: Repository<User>, connection: Connection);
    create({ impUid, amount, currentUser }: {
        impUid: any;
        amount: any;
        currentUser: any;
    }): Promise<PointTransaction>;
}
