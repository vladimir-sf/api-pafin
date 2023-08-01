import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { IAppConfig } from "./IAppConfig";

export interface IAppRequest extends ExpressRequest {
  appConfig?: IAppConfig;
}
export interface IAppResponse extends ExpressResponse {}
