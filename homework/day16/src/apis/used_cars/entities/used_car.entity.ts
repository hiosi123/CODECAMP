import { CarKind } from 'src/apis/carKind/entities/carKind.entity';
import { Model } from 'src/apis/carModel/entities/carModel.entity';
import { Dealer } from 'src/apis/dealer/entities/dealer.entity';
import { DriveMethod } from 'src/apis/driveMethod/entities/driveMethod.entity';
import { Fuel } from 'src/apis/fuel/entities/fuel.entity';
import { Gear } from 'src/apis/gearKind/entities/gearKind.entity';

import { OptionDetail } from 'src/apis/optionDetail/entities/optionDetail.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Used_car {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column() //{ type: 'varchar' } 처음에는 디폴트로 나중에 필요한 부분을 수정
  car_number: string;

  @Column()
  is_nativeCar: boolean;

  @Column()
  cc: number;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  km: number;

  @Column()
  seater: string;

  @Column()
  reportNumber: string;

  @Column()
  is_seizuer: boolean;

  @Column()
  carIntro: string;

  @Column()
  is_accident: boolean;

  @Column()
  is_repair: boolean;

  @Column()
  price: number;

  @Column()
  is_sold: boolean;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @OneToOne(() => Gear) //mysql 에 알려줘야함 one to one 관계라는것을
  gear: Gear;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @OneToOne(() => Fuel) //mysql 에 알려줘야함 one to one 관계라는것을
  fuel: Fuel;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @OneToOne(() => CarKind) //mysql 에 알려줘야함 one to one 관계라는것을
  carkind: CarKind;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @OneToOne(() => DriveMethod) //mysql 에 알려줘야함 one to one 관계라는것을
  driveMethod: DriveMethod;

  @ManyToOne(() => Model)
  model: Model;

  @ManyToOne(() => Dealer)
  dealer: Dealer;

  @JoinTable()
  @ManyToMany(() => OptionDetail, (optionDetail) => optionDetail.used_car) //(,태그에서 나를 어떻게 찾을것인가)
  optionDetail: OptionDetail[];

  @JoinTable()
  @ManyToMany(() => User, (user) => user.used_car)
  user: User;
}
