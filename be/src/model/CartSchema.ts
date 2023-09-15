import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from './AccountSchema';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Cart extends Document {
  @Prop()
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'Account' })
  account: Account;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
