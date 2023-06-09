import prisma from "lib/prisma";
import { getPosts } from "lib/data.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewPost from "components/NewPost";
import Posts from "components/Posts";
import LoadMorePosts from "components/LoadMorePosts";
import { useState } from "react";

export default function Home({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
    <div>
      <header className="sticky top-0 z-50 bg-white text-white py-4 px-12 mb-10">
        <h1 className="text-3xl text-[#00214d] font-bold">posthive.</h1>
      </header>
      <div
        className={`bg-white min-h-screen flex-col items-center justify-between px-10`}
      >
        <NewPost posts={posts} setPosts={setPosts} />
        <Posts posts={posts} />
        <LoadMorePosts posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma, 5);
  posts = JSON.parse(JSON.stringify(posts));

  return {
    props: {
      posts,
      initialPosts: posts,
    },
  };
}
