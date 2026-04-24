import { fakerEN_IN as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.client";

async function seedUsers() {
  console.log("Seeding users.....");
  const users = [];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullname = `${firstName} ${lastName}`;
    const email = faker.internet.email({
      allowSpecialCharacters: false,
      firstName: firstName,
    });
    const password = await bcrypt.hash("12345678", 10);

    users.push({ fullname, email, password_hash: password });
  }

  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Inserted data");
  console.log(JSON.stringify(result, null, 2));
}
seedUsers();
