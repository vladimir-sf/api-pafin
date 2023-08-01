import express from "express";
import AppConfig from "./appConfig";
import { expressjwt } from "express-jwt";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import UserRoutes from "./routes/UserRoutes";
import CommonRoutes from "./routes/CommonRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import swaggerDocument from "./swagger/swagger.json";

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

  // @todo: mv to ./middlewares
  private setupSwagger(): void {
    const options = {
      definition: {
        openapi: "3.1.0",
        info: {
          title: "pafin api",
          version: "1.0.0",
        },
      },
      apis: ["./src/app/routes/**/*.ts"],
      tags: [
        {
          name: "Authentication",
          description: "Endpoints related to user authentication",
        },
        {
          name: "Users",
          description: "Endpoints related to user management",
        },
      ],
    };

    const specs = swaggerJsdoc(options) as SwaggerSpecs;
    const combinedSpecs = { ...swaggerDocument, paths: specs.paths };
    this.server.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(combinedSpecs),
    );
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
    }).unless({
      path: ["/", "/auth/login", "/auth/register", /^\/api-docs\/.*/],
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.server.use(jwtMiddleware);
  }

  // @todo: find another way to pass the appConfig to the controllers
  // @todo: probably the best way is to use a dependency injection framework
  // @todo: we should rename it; we are not setting up the context, we are adding appConfig
  // POTENTIAL PROBLEM: if we log req it will expose the appConfig
  private setupContext(): void {
    this.server.use((req, res, next) => {
      Object.assign(req, { appConfig: this.appConfig });
      next();
    });
  }
}

interface SwaggerSpecs {
  paths: object;
}
