import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      className={`flex  bg-white min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <a
        className="border-[2px] rounded text-[#f2e8cf] bg-[#386641] px-6 py-1 border-[#386641]"
        href="/api/auth/signin"
      >
        Login
      </a>
    </main>
  );
}
