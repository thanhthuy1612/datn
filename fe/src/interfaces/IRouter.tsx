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

export enum DateFormatType {
  Date = 0,
  FullDate = 1,
}
