import IUserService from "../interfaces/IUserService";
import UsersService from "../services/UsersService";
import { IAppRequest, IAppResponse } from "../interfaces/IRequestResponse";
import User from "../models/User";
import {
  CommonValidation,
  OperationType,
} from "../common/CommonValidationDefinitions";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthController {
  private readonly usersService: IUserService;

  constructor() {
    this.usersService = new UsersService();
    console.log("ctor/auth/");
  }

  public async register(req: IAppRequest, res: IAppResponse): Promise<void> {
    // @todo: change that, find a way to always have the appConfig available
    const secret = req?.appConfig?.jwtSecret;
    if (!secret) {
      res.status(500).send({ message: "Internal server error" });
      console.log("Missing jwtSecret in appConfig");
      return;
    }

    const body = req.body as Record<string, number | string | Date>;
    if (!body) {
      res.status(400).send({ message: "Missing request body" });
      return;
    }
    const user = User.fromAny(body);
    const validationResult = user.validate(OperationType.CREATE);
    if (validationResult.error) {
      res.status(400).send(validationResult.error.details);
      return;
    }

    const existingUser = await this.usersService.getByEmail(<string>user.email);
    if (existingUser) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }

    user.password = await bcrypt.hash(<string>user.password, 2);
    await this.usersService.create(user);
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.send({ token });
  }

  public async login(req: IAppRequest, res: IAppResponse): Promise<void> {
    // @todo: change that, find a way to always have the appConfig available
    const secret = req?.appConfig?.jwtSecret;
    if (!secret) {
      res.status(500).send({ message: "Internal server error" });
      console.log("Missing jwtSecret in appConfig");
      return;
    }

    const body = req.body as Record<string, string>;
    if (!body) {
      res.status(400).send({ message: "Missing request body" });
      return;
    }
    const { email, password } = body;
    const emailValidationResult = CommonValidation.validateEmail(body.email);
    if (emailValidationResult.error) {
      res.status(400).send(emailValidationResult.error.details);
      return;
    }

    if (!password) {
      res.status(400).send({ message: "Missing password" });
      return;
    }

    const user = await this.usersService.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, <string>user.password))) {
      res.status(401).send({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.send({ token });
  }
}
