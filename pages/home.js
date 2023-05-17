import prisma from "lib/prisma";
import { getPosts } from "lib/data.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewPost from "components/NewPost";
import Posts from "components/Posts";

export default function Home({ posts }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
    return;
  }

  //if a person doesn't have a username set but are logged in
  if (session && !session.user.name) {
    router.push("/setup");
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`bg-white min-h-screen flex-col items-center justify-between p-24 `}
    >
      <NewPost />
      <Posts posts={posts} />
    </div>
  );
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma, 5);
  posts = JSON.parse(JSON.stringify(posts));

  return {
    props: {
      posts,
    },
  };
}
