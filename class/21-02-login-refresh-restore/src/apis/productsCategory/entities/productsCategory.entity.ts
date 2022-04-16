import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  @Field(() => String)
  id: string;

  @Column({ unique: true }) //{ type: 'varchar' } 처음에는 디폴트로 나중에 필요한 부분을 수정
  @Field(() => String)
  name: string;
}
