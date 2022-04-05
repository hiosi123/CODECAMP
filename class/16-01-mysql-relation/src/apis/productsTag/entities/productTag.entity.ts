import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column() //{ type: 'varchar' } 처음에는 디폴트로 나중에 필요한 부분을 수정
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags) //(,products 에서 나를 어떻게 찾을것인가)
  products: Product[];
}
