import React from "react";

export interface IRouter {
  id: number;
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }>;
}

export interface IAccount {
  id?: string;
  username?: string;
  bio?: string;
  email?: string;
  ava: string | undefined;
  banner: string | undefined;
  wallet?: string;
  timeJoin?: Date;
  carts?: unknown;
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
