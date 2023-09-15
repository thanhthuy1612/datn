import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Cart } from './CartSchema';

@Schema({
  timestamps: true,
})
export class Account extends Document {
  @Prop()
  username: string;

  @Prop()
  bio: string;

  @Prop()
  email: string;

  @Prop()
  ava: string;

  @Prop()
  banner: string;

  @Prop({ required: true })
  wallet: string;

  @Prop()
  timeJoin: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cart' }] })
  carts: Cart[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
