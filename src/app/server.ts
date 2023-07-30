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

  public start(): void {
    this.server.listen(this.appConfig.port, () =>
      console.log(`Server started on port ${this.appConfig.port}`),
    );
  }

  private setupMiddlewares(): void {
    this.server.use(express.json());
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.use(
      (err: Error, _req: express.Request, res: express.Response) => {
        console.error(err.stack ?? "No error stack available!");
        res.status(500).send("An error occurred!");
      },
    );
  }

  private setupRoutes(): void {
    this.server.use("/users", UserRoutes);
  }
}
