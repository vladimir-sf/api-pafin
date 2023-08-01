import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.uuid("id").primary().alter();
  });
}
