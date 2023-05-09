import prisma from "lib/prisma";
import { getUserPosts } from "lib/data.js";

import Posts from "components/Posts";

export default function UserProfile({ name, posts }) {
  return (
    <div className="bg-white h-screen items-center justify-between px-24 pt-4">
      <p className="font-medium text-[24px] p-5">{name}s profile</p>
      <Posts posts={posts} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let posts = await getUserPosts(params.name, prisma);
  posts = JSON.parse(JSON.stringify(posts));

  return {
    props: {
      name: params.name,
      posts,
    },
  };
}
