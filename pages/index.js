import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Posts from "components/Posts";
import prisma from "lib/prisma";
import { getPosts } from "lib/data.js";

const inter = Inter({ subsets: ["latin"] });

export default function Index({ posts }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session) {
    router.push("/home");
  }

  return (
    <main
      className={` bg-white min-h-screen flex-col items-center justify-between py-24 px-12 ${inter.className}`}
    >
      <div className="mt-10">
        <Posts posts={posts.slice(0, 3)} />
        <div className="text-center py-10 border">
          <h2 className="mb-10 font-medium text-[18px]">
            Join all the cool conversations!
          </h2>
          <a
            className="border-[1px] px-8 py-2 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker"
            href="/api/auth/signin"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma);
  posts = JSON.parse(JSON.stringify(posts));

  return {
    props: {
      posts,
    },
  };
}
