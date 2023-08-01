// @todo: come up with a better name for this
import Joi from "joi";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
}

export class CommonValidation {
  private constructor() {}

  public static validateId(toValidate: string): Joi.ValidationResult {
    const schema = Joi.object({
      id: Joi.string().guid().required(),
    });

    return schema.validate(
      { id: toValidate },
      { allowUnknown: true, abortEarly: false },
    );
  }
}
