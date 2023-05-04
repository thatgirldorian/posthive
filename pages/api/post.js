import prisma from "lib/prisma";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession({ req, res, authOptions });

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

  if (!user)
    if (req.method === "POST") {
      console.log("hey");
      res.end();
      return;
    }
}
