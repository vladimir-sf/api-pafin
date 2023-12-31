import IUserService from "../interfaces/IUserService";
import UserModel from "../db/models/UserModel";
import User from "../models/User";

export default class UsersService implements IUserService {
  // @todo: implement pagination
  public async list(): Promise<User[]> {
    try {
      const users = await UserModel.query();
      return users.map((user) => User.fromDb(user));
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(`Error fetching users: ${ex.message}`);
      } else {
        throw new Error("An unknown error occurred fetching users");
      }
    }
  }

  public async get(id: string): Promise<User | null> {
    try {
      const user = await UserModel.query().findById(id);
      return user ? User.fromDb(user) : null;
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(`Error fetching user with [id=${id}]: ${ex.message}`);
      } else {
        throw new Error(
          `An unknown error occurred fetching user with [id=${id}]`,
        );
      }
    }
  }

  public async create(obj: User): Promise<User> {
    try {
      const newUser = await UserModel.query().insertAndFetch(obj.toDb());
      return User.fromDb(newUser);
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(`Error creating user: ${ex.message}`);
      } else {
        throw new Error("An unknown error occurred creating user");
      }
    }
  }

  public async update(id: string, obj: User): Promise<User> {
    try {
      const updatedUser = await UserModel.query().patchAndFetchById(
        id,
        obj.toDb(),
      );

      return User.fromDb(updatedUser);
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(`Error updating user with [id=${id}]: ${ex.message}`);
      } else {
        throw new Error(
          `An unknown error occurred updating user with [id=${id}]`,
        );
      }
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await UserModel.query().deleteById(id);
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(`Error deleting user with id ${id}: ${ex.message}`);
      } else {
        throw new Error(
          `An unknown error occurred deleting user with [id=${id}]`,
        );
      }
    }
  }

  public async getByEmail(email: string): Promise<User | null> {
    try {
      const dbUser = await UserModel.query().where("email", email).first();
      return dbUser ? User.fromDb(dbUser) : null;
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(
          `Error fetching user with [email=${email}]: ${ex.message}`,
        );
      } else {
        throw new Error(
          `An unknown error occurred fetching user with [email=${email}]`,
        );
      }
    }
  }
}
