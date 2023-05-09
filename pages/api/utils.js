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

  if (req.body.task === "generate_users_and_posts") {
  }

  if (req.body.task === "generate_one_post") {
  }

  res.end();
}
