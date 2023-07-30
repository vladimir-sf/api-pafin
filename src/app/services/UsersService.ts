import IUserService from "../interfaces/IUserService";

export default class UsersService implements IUserService {
  // @todo: add list implementation
  public async list(): Promise<string> {
    try {
      const result = await new Promise<string>((resolve) => {
        resolve("list");
      });

      return result;
    } catch (ex) {
      return "error";
    }
  }

  // @todo: add get implementation
  public async get(): Promise<string> {
    try {
      const result = await new Promise<string>((resolve) => {
        resolve("get");
      });

      return result;
    } catch (ex) {
      return "error";
    }
  }
  // @todo: add create implementation
  public async create(): Promise<string> {
    try {
      const result = await new Promise<string>((resolve) => {
        resolve("create");
      });

      return result;
    } catch (ex) {
      return "error";
    }
  }
  // @todo: add update implementation
  public async update(): Promise<string> {
    try {
      const result = await new Promise<string>((resolve) => {
        resolve("update");
      });

      return result;
    } catch (ex) {
      return "error";
    }
  }
  // @todo: add delete implementation
  public async delete(): Promise<string> {
    try {
      const result = await new Promise<string>((resolve) => {
        resolve("delete");
      });

      return result;
    } catch (ex) {
      return "error";
    }
  }
}
