import { Model, snakeCaseMappers } from "objection";

export default class UserModel extends Model {
  public id: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get columnNameMappers() {
    // map column names to property names and vice versa
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password", "updatedAt"],
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    };
  }
}
