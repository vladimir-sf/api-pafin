import express from "express";
import AppConfig from "./appConfig";
// import swaggerUi from 'swagger-ui-express';
import UserRoutes from "./routes/UserRoutes";
import CommonRoutes from "./routes/CommonRoutes";
// import swaggerDocument from '../../swagger/swagger.json';

export default class Server {
  private readonly server: express.Application;

  constructor(private readonly appConfig: AppConfig) {
    this.server = express();

    this.setupMiddlewares();
  }

  public start(): void {
    this.server.listen(this.appConfig.port, () =>
      console.log(`Server started on port ${this.appConfig.port}`),
    );
  }

  private setupMiddlewares(): void {
    this.server.use(express.json());
    this.setupRoutes();
    this.setupSwagger();
    // ensure that it is the last to be invoked, after all routes and other middlewares.
    this.setupErrorHandling();
  }

  private setupSwagger(): void {
    // @todo: setup swagger
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
    this.server.use("/", CommonRoutes);
  }
}
