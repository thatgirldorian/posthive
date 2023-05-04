import { useSession } from "next-auth/react";
import NewPost from "components/NewPost";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div
      className={`flex  bg-white min-h-screen flex-col items-center justify-between p-24 `}
    >
      {session ? <NewPost /> : <p>Login failed. Please try again. 🙁</p>}
    </div>
  );
}
