import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  drinks: string;

  @Column()
  @Field(() => String)
  cost: string;

  @Column()
  @Field(() => Int)
  kcal: number;

  @Column()
  @Field(() => Int)
  fat: number;

  @Column()
  @Field(() => Int)
  natrium: number;

  @Column()
  @Field(() => Int)
  sugar: number;

  @Column()
  @Field(() => Int)
  caffeine: number;
}
