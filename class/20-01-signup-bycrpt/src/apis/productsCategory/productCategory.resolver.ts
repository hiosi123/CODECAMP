import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productsCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCateogryResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Mutation(() => ProductCategory) // 프런트에서 받아가는 데이터 타입
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
}
