import UserModel from "../db/models/UserModel";
interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class User {
  public id: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  public static fromAny(props: UserProps): User {
    const user = new User();

    if (props.id !== undefined) {
      user.id = props.id;
    }

    if (props.name !== undefined) {
      user.name = props.name;
    }

    if (props.email !== undefined) {
      user.email = props.email;
    }

    if (props.password !== undefined) {
      user.password = props.password;
    }

    if (props.createdAt !== undefined) {
      user.createdAt = props.createdAt;
    }

    if (props.updatedAt !== undefined) {
      user.updatedAt = props.updatedAt;
    }

    return user;
  }

  public static fromDb(props: UserModel): User {
    return User.fromAny(props);
  }

  public toDb(): Partial<UserModel> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  // @todo: add toDb method
  // @todo: add fromDb method
}
