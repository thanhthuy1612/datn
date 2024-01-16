import React from "react";

export interface IRouter {
  id: number;
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }>;
}

export enum ITypeAccount {
  None = 0,
  Farm = 1,
  Ship = 2,
  Buy = 3,
  Custom = 4,
}
export interface IAccount {
  id?: string;
  username?: string;
  bio?: string;
  email?: string;
  ava?: string;
  banner?: string;
  wallet?: string;
  timeJoin?: Date;
  carts?: unknown;
  type?: ITypeAccount;
  address?: string;
}

export interface ICart {
  _id?: string;
  url?: string;
  account?: string;
}

export interface IProduct {
  _id?: string;
  name?: string;
  account?: string;
}

export interface IUploadPicture {
  Name: string;
  Hash: string;
  Size: string;
}

export interface IHistory {
  blockHash?: string;
  blockNumber?: string;
  confirmations?: string;
  contractAddress?: string;
  cumulativeGasUsed?: string;
  from?: string;
  functionName?: string;
  gas?: string;
  gasPrice?: string;
  gasUsed?: string;
  hash?: string;
  input?: string;
  isError?: string;
  methodId?: string;
  nonce?: string;
  timeStamp?: string;
  to?: string;
  transactionIndex?: string;
  txreceipt_status?: string;
  value?: string;
}

export enum DateFormatType {
  Date = 0,
  FullDate = 1,
}
