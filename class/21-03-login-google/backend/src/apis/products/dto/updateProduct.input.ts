import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {} //전체를 들고와도 되고 안들고 와도 되고

//PartialType - 들고와도 되고 안들고 완도 되고
//OmitType - 뺄 애들을 고르는거
//PickType - 골라올 애들을 고르는거
