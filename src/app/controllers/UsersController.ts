import IUserService from "../interfaces/IUserService";
import UsersService from "../services/UsersService";
import { IAppRequest, IAppResponse } from "../interfaces/IRequestResponse";
import User from "../models/User";
import {
  CommonValidation,
  OperationType,
} from "../common/CommonValidationDefinitions";

export default class UsersController {
  private readonly usersService: IUserService;

  constructor() {
    this.usersService = new UsersService();
    console.log("ctor/users/");
  }

  public async list(req: IAppRequest, res: IAppResponse): Promise<void> {
    const result = await this.usersService.list();
    res.send(result);
  }
  // @todo: consider extracting the validation logic to a separate method
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

    const result = await this.usersService.create(user);
    res.send(result);
  }

  public async get(req: IAppRequest, res: IAppResponse): Promise<void> {
    const id = req.params.id;
    const idValidationResult = CommonValidation.validateId(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.get(id);
    res.send(result);
  }

  public async update(req: IAppRequest, res: IAppResponse): Promise<void> {
    const body = req.body as Record<string, number | string | Date>;
    if (!body) {
      res.status(400).send({ message: "Missing request body" });
      return;
    }
    const user = User.fromAny(body);
    const bodyValidationResult = user.validate(OperationType.CREATE);
    if (bodyValidationResult.error) {
      res.status(400).send(bodyValidationResult.error.details);
      return;
    }

    const id = req.params.id;
    const idValidationResult = CommonValidation.validateId(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.update(id, user);
    res.send(result);
  }

  public async delete(req: IAppRequest, res: IAppResponse): Promise<void> {
    const id = req.params.id;
    const idValidationResult = CommonValidation.validateId(id);
    if (idValidationResult.error) {
      res.status(400).send(idValidationResult.error.details);
      return;
    }

    const result = await this.usersService.delete(id);
    res.send(result);
  }
}
