// @todo: come up with a better name for this
import Joi from "joi";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
}

export class CommonValidation {
  private constructor() {}

  public static validateUUID(toValidate: string): Joi.ValidationResult {
    const schema = Joi.object({
      id: Joi.string().guid().required(),
    });

    return schema.validate(
      { id: toValidate },
      { allowUnknown: true, abortEarly: false },
    );
  }

  public static validateEmail(toValidate: string): Joi.ValidationResult {
    const schema = Joi.object({
      email: Joi.string().min(1).max(255).email().required(),
    });

    return schema.validate(
      { email: toValidate },
      { allowUnknown: true, abortEarly: false },
    );
  }

  public static validatePassword(toValidate: string): Joi.ValidationResult {
    const schema = Joi.object({
      password: Joi.string().min(10).max(255).required(),
    });

    return schema.validate(
      { password: toValidate },
      { allowUnknown: true, abortEarly: false },
    );
  }
}
