import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { create } from 'domain';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly productService: ProductService,

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    //엘라스틱 서치에서 조회 연습하기
    const result = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, '   '));
    //엘라스틱서치에서 조회해보기 위해 임시로 주석!!
    return this.productService.findAll();
    // yarn add @nestjs/elasticsearch
    //yarn add @elastic/elasticsearch
    //http://localhost:9200/myproduct/_search?pretty
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productService.fineOne({ productId });
  }

  @Mutation(() => Product) // 프런트에서 받아가는 데이터 타입
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct',
    //   document: {
    //     name: '철수',
    //     age: 13,
    //     school: '다람쥐초등학교',
    //     ...createProductInput,
    //   },
    // });
    //엘라스틱 서치에서 등록 연습하기!! 실제로는 mysql 에 저장할 예정
    //엘라스틱서치에서 등록해보기 위해 임시로 주석!!
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인하기
    await this.productService.checkSoldout({ productId });

    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
