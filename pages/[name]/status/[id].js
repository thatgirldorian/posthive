import Post from "components/Post";
import { getPost } from "lib/data.js";
import prisma from "lib/prisma";

export default function SinglePost({ post }) {
  return (
    <div className="bg-white h-screen items-center justify-between px-24 pt-4">
      <Post post={post} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let post = await getPost(params.id, prisma);
  post = JSON.parse(JSON.stringify(post));

  return {
    props: {
      post,
    },
  };
}
