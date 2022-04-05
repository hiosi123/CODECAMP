import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) //db에 접근하기 위한 코딩
    private readonly productRepository: Repository<Product>, //db에 접근하기 위한 코딩
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async fineOne({ productId }) {
    return await this.productRepository.find({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    // 상품을 데이터 베이스에 저장
    const result = await this.productRepository.save({
      // 하나하나 직접 나열
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
      ...createProductInput,
    });
    //name:name 생략가능
    console.log(result);

    return result;
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId }, //여기는 조회
    });
    const newProduct = {
      ...product,
      ...updateProductInput,
      // id: product.id,
      // name: product.name,
      // description: product.description, //description: updateProductInput.description
      // price: product.price,
      // isSoldout: product.isSoldout,
    };
    return await this.productRepository.save(newProduct); // 같은 세이브 이지만 안에 데이터에 따라 등록이 되거나 수정이됨
  }

  async checkSoldout({ productId }) {
    //try {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    //   console.log('서버점검완료');
    //   console.log('서버점검완료');
    //   console.log('상태점검완료');
    // } catch (error) {
    //   throw error.message;
    // } finally {
    //   //특정로직 캐치를 하던 트라이를 하던 무조건 요청을 실행 해야하는 로직
    // }
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
