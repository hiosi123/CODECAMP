import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productsCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory) //db에 접근하기 위한 코딩
    private readonly productCategoryRepository: Repository<ProductCategory>, //db에 접근하기 위한 코딩
  ) {}
  async create({ name }) {
    // 카테고리를 데이터 베이스에 저장
    const result = await this.productCategoryRepository.save({ name }); //name:name 생략가능
    console.log(result);

    return result;
  }
}
