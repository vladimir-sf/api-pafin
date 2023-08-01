import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.uuid("new_id").defaultTo(knex.raw("uuid_generate_v4()")).after("id");
    table.dropPrimary();
    table.dropColumn("id");
    table.renameColumn("new_id", "id");
    table.primary(["id"]);
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function down(knex: Knex): Promise<void> {}
