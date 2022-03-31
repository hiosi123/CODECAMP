import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  fat: number;

  @Field(() => Int)
  natrium: number;

  @Field(() => Int)
  sugar: number;

  @Field(() => Int)
  caffeine: number;
}
