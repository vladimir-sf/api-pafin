import UserModel from "../db/models/UserModel";
import Joi from "joi";
import { OperationType } from "../common/CommonValidationDefinitions";

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
    // @todo: verify if this is necessary
    if (props.createdAt !== undefined) {
      user.createdAt = props.createdAt;
    }
    // @todo: verify if this is necessary
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

  public validate(operation: OperationType): Joi.ValidationResult {
    let schema = Joi.object({
      id: Joi.string().guid().optional(),
      name: Joi.string().min(10).max(255).optional(),
      email: Joi.string().min(1).max(255).email().optional(),
      password: Joi.string().min(1).max(255).optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
    });

    if (operation === OperationType.CREATE) {
      schema = schema.fork(["name", "email", "password"], (schema) =>
        schema.required(),
      );
    }

    return schema.validate(this, { allowUnknown: true, abortEarly: false });
  }
}
