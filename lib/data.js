import prisma from "./prisma";

export const getPosts = async (prisma) => {
  return await prisma.post.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
};

export const getUserPosts = async (name, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        name: name,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
  return posts;
};
