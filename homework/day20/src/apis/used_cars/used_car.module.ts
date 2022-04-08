import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from '../fuel/entities/fuel.entity';
import { OptionDetail } from '../optionDetail/entities/optionDetail.entity';
import { Used_car } from './entities/used_car.entity';

import { Used_carResolver } from './used_car.resolver';
import { Used_carService } from './used_car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Used_car, Fuel, OptionDetail])],
  //controller: []
  providers: [
    //그래프 큐엘 형태를 가져오기때문
    Used_carResolver,
    Used_carService,
  ],
})
export class Used_carModule {}
