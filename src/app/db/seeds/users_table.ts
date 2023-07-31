import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  console.log('Seed stage in progress: adding users');
  await knex("users").del();

  // Generates new entries
  const fakeUsers = [];
  const desiredFakeUsers = 10;

  for (let i = 0; i < desiredFakeUsers; i += 1) {
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 2);

    fakeUsers.push({
      id: knex.raw('uuid_generate_v4()'),
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
