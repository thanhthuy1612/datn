import { Document } from 'mongoose';

export class ICart extends Document {
  url: string;
  account: string;
}
