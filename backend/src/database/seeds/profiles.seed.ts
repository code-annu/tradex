import { faker } from "@faker-js/faker";
import { prisma } from "../../config/prisma.client";

async function seedProfile() {
  console.log("Seeding profiles.....");
  const profiles = [];
  const users = await prisma.user.findMany();

  for (const user of users) {
    const isMale = faker.datatype.boolean();
    const gender = isMale ? "Male" : "Female";
    const dob = faker.date.birthdate();
    profiles.push({
      uuid: user.uuid,
      gender,
      dob,
    });
  }

  const result = await prisma.profile.createMany({
    data: profiles,
    skipDuplicates: true,
  });

  console.log("Inserted data");
  console.log(JSON.stringify(result, null, 2));
}

seedProfile();
