import prisma from "./prisma";

export const getPosts = async (prisma, take, cursor) => {
  return await prisma.post.findMany({
    where: {
      parent: null,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
    take,
    cursor,
    skip: cursor ? 1 : 0,
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

  if (post.parent) {
    post.parent_data = await prisma.post.findUnique({
      where: {
        id: parseInt(post.parent),
      },
      include: {
        author: true,
      },
    });
  }

  return post;
};

export const getReplies = async (id, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      parent: parseInt(id),
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
