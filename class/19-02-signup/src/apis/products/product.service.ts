import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) //db에 접근하기 위한 코딩
    private readonly productRepository: Repository<Product>, //db에 접근하기 위한 코딩

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async fineOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // // 상품을 데이터 베이스에 저장
    // const result = await this.productRepository.save({
    //   // 하나하나 직접 나열
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    //   ...createProductInput,
    // });
    // //name:name 생략가능
    // console.log(result);

    // 2. 상품과 상품 거래 위치를 같이 등록하는 경우

    // createProductInput.name;
    // createProductInput.description;
    // createProductInput.price;
    // createProductInput.productSaleslocation;
    const { productTags, productSaleslocation, productCategoryId, ...rest } =
      createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
    const result3 = [];
    //productTags // ["#전자제품", "#영등포", "#컴퓨터"]
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');
      // 이미 등록된 태그인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });
      //기존에 태그가 존재한다면
      if (prevTag) {
        result3.push(prevTag);
        //기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        result3.push(newTag);
      }
    }

    const result2 = await this.productRepository.save({
      ...rest,
      productSaleslocation: result, //{ id: result.id}
      productCategory: { id: productCategoryId },
      productTags: result3,
    });

    return result2;
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

  async delete({ productId }) {
    // //1. 실제 삭제
    // const result = await this.productRepository.delete({
    //   id: productId,
    // });
    // return result.affected ? true : false; //3

    // //2. 소프트 삭제(직접 구현)
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // //3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // //4. 소프트 삭제(typeORM 제공) - softRomove
    // this.productRepository.softRemove({ id: productId }); //id로만 삭제 가능

    //5. 소프트 삭제(typeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); //다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
