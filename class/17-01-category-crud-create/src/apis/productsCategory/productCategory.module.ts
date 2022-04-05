import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productsCategory.entity';
import { ProductCateogryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  //controller: []
  providers: [
    ProductCateogryResolver, //그래프 큐엘 형태를 가져오기때문
    ProductCategoryService,
  ],
})
export class ProductCateogryModule {}
