import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    address: string;
    used_car: Used_car[];
}
