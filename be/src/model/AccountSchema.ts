import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: Date })
  timeJoin: Date;

  @Prop()
  type: number;

  @Prop()
  address: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
