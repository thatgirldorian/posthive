import { useRouter } from "next/router";
import { useState } from "react";

export default function NewReply({ post }) {
  const router = useRouter();
  const [reply, setReply] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!reply) {
          alert("Please add some text to your reply.");
          return;
        }

        const res = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parent: post.id,
            content: reply,
          }),
        });
        router.reload(window.location.pathname);
      }}
    >
      <div className="flex">
        <div className="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
          <textarea
            className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            rows={2}
            cols={50}
            placeholder="Post a reply"
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 my-4">
          <button className="border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full">
            Reply
          </button>
        </div>
      </div>
    </form>
  );
}
