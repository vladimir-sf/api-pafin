// initializing objection and knex before everything else
import "./db/db";
import AppConfig from "./appConfig";
import Server from "./server";

export default class App {
  private readonly appConfig: AppConfig;
  private readonly server: Server;

  constructor() {
    this.appConfig = AppConfig.getInstance();
    this.server = new Server(this.appConfig);
  }

  public start(): void {
    this.server.start();
  }
}
