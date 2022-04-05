import { Brand } from 'src/apis/brand/entities/brand.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column()
  modelName: string;

  @ManyToOne(() => Brand)
  brand: Brand;
}
