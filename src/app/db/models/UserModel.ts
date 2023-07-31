import Objection, { Model, QueryContext, snakeCaseMappers } from "objection";

export default class UserModel extends Model {
  public static tableName = "users";
  public static columnNameMappers = snakeCaseMappers();

  public id: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  public async $beforeInsert(queryContext: QueryContext): Promise<void> {
    await super.$beforeInsert(queryContext);

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public async $beforeUpdate(
    opt: Objection.ModelOptions,
    queryContext: Objection.QueryContext,
  ): Promise<void> {
    await super.$beforeUpdate(opt, queryContext);

    this.updatedAt = new Date();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
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
