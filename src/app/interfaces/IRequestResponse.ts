import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export interface IAppRequest extends ExpressRequest {}
export interface IAppResponse extends ExpressResponse {}
