import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuel } from '../fuel/entities/fuel.entity';
import { Gear } from '../gearKind/entities/gearKind.entity';

import { Used_car } from './entities/used_car.entity';

@Injectable()
export class Used_carService {
  constructor(
    @InjectRepository(Used_car) //db에 접근하기 위한 코딩
    private readonly used_carRepository: Repository<Used_car>, //db에 접근하기 위한 코딩

    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>,
  ) {}

  async findAll() {
    return await this.used_carRepository.find({
      relations: ['gear', 'fuel'],
    });
  }
  async findAllDel() {
    return await this.used_carRepository.find({
      withDeleted: true,
      relations: ['gear', 'fuel'],
    });
  }

  async fineOne({ carId }) {
    const result1 = await this.used_carRepository.findOne({
      where: { car_id: carId },
      relations: ['gear', 'fuel'],
    });
    console.log(result1);
    return result1;
  }

  async create({ used_carInput }) {
    const { fuel, gear, ...rest } = used_carInput;
    // 상품을 데이터 베이스에 저장
    const result1 = await this.fuelRepository.save({
      ...fuel,
    });

    const result = await this.used_carRepository.save({
      ...rest,
      fuel: result1,
      gear: { id: gear },
    });
    //name:name 생략가능
    console.log(result);

    return result;
  }

  async update({ carId, used_carInput }) {
    const product = await this.used_carRepository.findOne({
      where: { car_id: carId }, //여기는 조회
    });
    const newProduct = {
      ...product,
      ...used_carInput,
      // id: product.id,
      // name: product.name,
      // description: product.description, //description: used_carInput.description
      // price: product.price,
      // isSoldout: product.isSoldout,
    };
    return await this.used_carRepository.save(newProduct); // 같은 세이브 이지만 안에 데이터에 따라 등록이 되거나 수정이됨
  }

  async checkSoldout({ carId }) {
    //try {
    const product = await this.used_carRepository.findOne({
      where: { car_id: carId },
    });
    //   console.log('서버점검완료');
    //   console.log('서버점검완료');
    //   console.log('상태점검완료');
    // } catch (error) {
    //   throw error.message;
    // } finally {
    //   //특정로직 캐치를 하던 트라이를 하던 무조건 요청을 실행 해야하는 로직
    // }

    if (product.is_sold)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ carId }) {
    const result = await this.used_carRepository.softDelete({ car_id: carId });
    return result.affected ? true : false;
  }

  async restore({ carId }) {
    const result = await this.used_carRepository.restore({ car_id: carId });
    return result.affected ? true : false;
  }
}
