import { Document } from 'mongoose';
import { ITypeAccount } from './ITypeAccount';

export class IAccount extends Document {
  username: string;
  bio: string;
  email: string;
  ava: string;
  banner: string;
  wallet: string;
  timeJoin: Date;
  type: ITypeAccount;
}
