export const getPosts = async (prisma) => {
  return await prisma.post.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
};
