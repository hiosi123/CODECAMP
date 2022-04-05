import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OptionDetail {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Used_car, (used_car) => used_car.optionDetail) //(,products 에서 나를 어떻게 찾을것인가)
  used_car: Used_car[];
}
