import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dealer {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column()
  name: string;

  @Column()
  phone: number;

  @Column()
  location: string;

  @Column()
  image: string;
}
