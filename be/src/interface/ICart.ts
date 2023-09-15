import { Document } from 'mongoose';
import { IAccount } from './IAccount';

export class ICart extends Document {
  url: string;
  account: IAccount;
}
