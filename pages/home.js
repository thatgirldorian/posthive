import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewPost from "components/NewPost";
import Posts from "components/Posts";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`bg-white min-h-screen flex-col items-center justify-between p-24 `}
    >
      <NewPost />
      <Posts
        posts={[
          { content: "MY first post!" },
          { content: "another new post :)" },
        ]}
      />
    </div>
  );
}
