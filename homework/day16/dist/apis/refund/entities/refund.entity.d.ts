import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import { User } from 'src/apis/user/entities/user.entity';
export declare class Refund {
    id: string;
    time: Date;
    user: User;
    used_car: Used_car;
}
