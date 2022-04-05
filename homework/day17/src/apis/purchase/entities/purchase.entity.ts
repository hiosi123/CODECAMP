import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column()
  time: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Used_car)
  used_car: Used_car;
}
