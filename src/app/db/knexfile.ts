import dotenv from "dotenv";
dotenv.config();
import "ts-node/register";
import type { Knex } from "knex";

const environments = ["development"];

const commonConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: "ts",
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./seeds",
  },
};

export default Object.fromEntries(
  environments.map((env: string) => [env, commonConfig]),
);
