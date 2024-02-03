/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// https://youtu.be/NN5tysmkPF4
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const USER_LENGTH = 10;
const POSTS_PER_USER = 3;

async function main() {
  for (let index = 0; index < USER_LENGTH; index++) {
    const username = faker.person.firstName();
    const email = faker.internet.email();
    const image = faker.image.avatarGitHub();
    const jobTitle = faker.person.jobTitle();

    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email,
        username,
        image,
        password: "123456",
        posts: {
          create: [
            ...Array.from({ length: POSTS_PER_USER }, () => ({
              title: faker.lorem.sentence({ min: 3, max: 5 }),
              text: faker.lorem.paragraph({ min: 1, max: 3 }),
              published: true,
            })),
          ],
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
