import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NewPost() {
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();

  //Hide component if we're not logged in
  if (!session || !session.user) {
    return null;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!content) {
          alert("You didn't add any content :(");
          return;
        }

        fetch("/api/post", {
          body: JSON.stringify({
            content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      }}
    >
      <div className="flex">
        <div className="flex-1 px-1 pt-2 mt-2 mr-1 ml-1">
          <textarea
            className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary"
            rows={2}
            cols={50}
            placeholder="What's on your mind today?"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 my-4">
          <button className="border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
