import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Cart extends Document {
  @Prop()
  url: string;

  @Prop()
  account: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
