import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Generates new entries
  const fakeUsers = [];
  const desiredFakeUsers = 10;

  for (let i = 0; i < desiredFakeUsers; i += 1) {
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 10);

    fakeUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });
  }

  // Inserts seed entries
  await knex("users").insert(fakeUsers);
}
