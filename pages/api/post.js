import prisma from "lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(501).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: "You're not currently logged in. :(" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found. :(" });
  }

  if (req.method === "POST") {
    await prisma.post.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id },
        },
      },
    });
    res.end();
    return;
  }

  if (req.method === "DELETE") {
    const id = req.body.id;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (post.author.id !== user.id) {
      res.status(401).end();
      return;
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).end();
    return;
  }
}
