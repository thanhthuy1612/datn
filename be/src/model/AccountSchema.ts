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

  @Prop()
  timeJoin: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
