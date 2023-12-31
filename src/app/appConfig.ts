import dotenv from "dotenv";
import { IAppConfig } from "./interfaces/IAppConfig";
dotenv.config();

export default class AppConfig {
  private static instance: AppConfig;
  private readonly config: IAppConfig;

  private constructor() {
    this.config = Object.freeze({
      port: Number(process.env.PORT) || 3000,
      jwtSecret: process.env.JWT_SECRET || "secret",
    });
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }

    return AppConfig.instance;
  }

  public get port(): number {
    return this.config.port;
  }

  public get jwtSecret(): string {
    return this.config.jwtSecret;
  }
}
