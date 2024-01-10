import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  account: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
