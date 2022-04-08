import { InputType, OmitType } from '@nestjs/graphql';
import { Fuel } from '../entities/fuel.entity';

@InputType()
export class fuelInput extends OmitType(Fuel, ['id'], InputType) {
  //   myColumn: String;
}
