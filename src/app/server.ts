import express from "express";
import AppConfig from "./appConfig";
import { expressjwt } from "express-jwt";
// import swaggerUi from 'swagger-ui-express';
import UserRoutes from "./routes/UserRoutes";
import CommonRoutes from "./routes/CommonRoutes";
import AuthRoutes from "./routes/AuthRoutes";
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
    // ensure that jwt is set up before any routes
    this.setupJwt();
    this.setupContext();

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
    this.server.use("/", CommonRoutes);
    this.server.use("/auth", AuthRoutes);
    this.server.use("/users", UserRoutes);
  }

  private setupJwt(): void {
    const jwtMiddleware = expressjwt({
      secret: this.appConfig.jwtSecret,
      algorithms: ["HS256"],
    }).unless({ path: ["/", "/auth/login", "/auth/register"] });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.server.use(jwtMiddleware);
  }

  // @todo: find another way to pass the appConfig to the controllers
  // potential problem: req logging will expose the appConfig
  private setupContext(): void {
    this.server.use((req, res, next) => {
      Object.assign(req, { appConfig: this.appConfig });
      next();
    });
  }
}
