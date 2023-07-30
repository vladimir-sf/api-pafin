import IUserService from "../interfaces/IUserService";
import UsersService from "../services/UsersService";
import { IAppRequest, IAppResponse } from "../interfaces/IRequestResponse";

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

  public async create(req: IAppRequest, res: IAppResponse): Promise<void> {
    const result = await this.usersService.create();
    res.send(result);
  }

  public async get(req: IAppRequest, res: IAppResponse): Promise<void> {
    const result = await this.usersService.get();
    res.send(result);
  }

  public async update(req: IAppRequest, res: IAppResponse): Promise<void> {
    const result = await this.usersService.update();
    res.send(result);
  }

  public async delete(req: IAppRequest, res: IAppResponse): Promise<void> {
    const result = await this.usersService.delete();
    res.send(result);
  }
}
