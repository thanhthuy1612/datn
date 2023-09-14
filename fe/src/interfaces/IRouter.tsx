import React from "react";

export interface IRouter {
  id: number;
  path: string;
  component: React.FC;
  layout?: React.FC;
}
