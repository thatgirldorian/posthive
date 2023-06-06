import prisma from "./prisma";

export const getPosts = async (prisma, take) => {
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
    take,
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

export const getPost = async (id, prisma) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return post;
};
