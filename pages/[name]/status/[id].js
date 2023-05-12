import Post from "components/Post";
import { getPost } from "lib/data.js";
import prisma from "lib/prisma";
import { useSession } from "next-auth/react";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/router";

export default function SinglePost({ post }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="bg-white h-screen items-center justify-between px-24 pt-4">
      <Post post={post} />

      {session && session.user.email === post.author.email && (
        <div className="flex-1 py-2 m-2 text-center">
          <a
            href="#"
            className="flex items-center justify-end w-fit px-3 py-2 mt-1 font-medium leading-6 border-[1px] rounded-full ml-auto"
            onClick={async () => {
              const res = await fetch("/api/post", {
                body: JSON.stringify({
                  id: post.id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "DELETE",
              });

              if (res.status === 401) {
                alert("Access is authorized :(");
              }
              if (res.status === 200) {
                router.push("/home");
              }
            }}
          >
            Delete
          </a>
        </div>
      )}
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
