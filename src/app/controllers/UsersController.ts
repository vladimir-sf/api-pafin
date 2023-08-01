import IUserService from "../interfaces/IUserService";
import UsersService from "../services/UsersService";
import { IAppRequest, IAppResponse } from "../interfaces/IRequestResponse";
import User from "../models/User";
import {
  CommonValidation,
  OperationType,
} from "../common/CommonValidationDefinitions";
import bcrypt from "bcryptjs";

// @todo: consider extracting the validation logic to a separate method
export default class UsersController {
  private readonly usersService: IUserService;

  constructor() {
    this.usersService = new UsersService();
    console.log("ctor/users/");
  }

  public async list(req: IAppRequest, res: IAppResponse): Promise<void> {
    // @todo: delete password from the result
    const result = await this.usersService.list();
    if (!result || result.length === 0) {
      res.status(404).send({ message: "No users found" });
      return;
    }
    res.send(result);
  }

  public async create(req: IAppRequest, res: IAppResponse): Promise<void> {
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

    user.password = await bcrypt.hash(<string>user.password, 2);
    const result = await this.usersService.create(user);
    res.send(result);
  }

  public async get(req: IAppRequest, res: IAppResponse): Promise<void> {
    // @todo: delete password from the result
    const id = req.params.id;
    const idValidationResult = CommonValidation.validateUUID(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.get(id);
    if (!result) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.send(result);
  }

  public async update(req: IAppRequest, res: IAppResponse): Promise<void> {
    // @todo: allow to update only name and email
    const body = req.body as Record<string, number | string | Date>;
    if (!body) {
      res.status(400).send({ message: "Missing request body" });
      return;
    }
    const user = User.fromAny(body);
    const bodyValidationResult = user.validate(OperationType.UPDATE);
    if (bodyValidationResult.error) {
      res.status(400).send(bodyValidationResult.error.details);
      return;
    }

    const id = req.params.id;
    const idValidationResult = CommonValidation.validateUUID(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.update(id, user);
    res.send(result);
  }

  public async delete(req: IAppRequest, res: IAppResponse): Promise<void> {
    const id = req.params.id;
    const idValidationResult = CommonValidation.validateUUID(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.delete(id);
    res.send(result);
  }
}
