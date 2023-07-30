import express from "express";
import AppConfig from "./appConfig";
import UserRoutes from "./routes/UserRoutes";

export default class Server {
  private readonly server: express.Application;

  constructor(private readonly appConfig: AppConfig) {
    this.server = express();

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.server.use(express.json());
  }

  private setupRoutes(): void {
    this.server.use("/users", UserRoutes);
  }

  public start(): void {
    this.server.listen(this.appConfig.port, () =>
      console.log(`Server started on port ${this.appConfig.port}`),
    );
  }
}
