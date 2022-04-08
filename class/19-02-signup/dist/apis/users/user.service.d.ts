import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create({ email, password, name, age }: {
        email: any;
        password: any;
        name: any;
        age: any;
    }): Promise<{
        email: any;
        password: any;
        name: any;
        age: any;
    } & User>;
}
