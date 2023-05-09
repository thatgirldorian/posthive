import prisma from "lib/prisma";
import { faker } from "@faker-js/faker";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method !== "POST") return res.end();

  if (req.body.task === "clean_database") {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        NOT: {
          email: {
            in: [session.user.email],
          },
        },
      },
    });
  }

  if (req.body.task === "generate_one_post") {
    const users = await prisma.user.findMany({});

    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];

    await prisma.post.create({
      data: {
        content: faker.hacker.phrase(),
        author: {
          connect: { id: user.id },
        },
      },
    });
  }

  if (req.body.task === "generate_users_and_posts") {
    let count = 0;

    while (count < 7) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          image: faker.internet.avatar(),
        },
      });

      count++;
    }

    //create 1 new post for each fake user
    const users = await prisma.user.findMany({});

    users.forEach(async (user) => {
      await prisma.post.create({
        data: {
          content: faker.hacker.phrase(),
          author: {
            connect: { id: user.id },
          },
        },
      });
    });
  }

  res.end();
}
