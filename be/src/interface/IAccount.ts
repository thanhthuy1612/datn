import { Document } from 'mongoose';

export class IAccount extends Document {
  username: string;
  bio: string;
  email: string;
  ava: string;
  banner: string;
  wallet: string;
  timeJoin: Date;
}
