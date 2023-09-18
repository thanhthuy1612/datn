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
  ava?: string;
  banner?: string;
  wallet?: string;
  timeJoin?: Date;
  carts?: unknown;
}
