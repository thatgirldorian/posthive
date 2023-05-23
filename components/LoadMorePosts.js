export default function LoadMorePosts({ posts, setPosts }) {
  return (
    <div className="mt-16 flex justify-center">
      <button
        className="justify-self-center border px-8 py-2 mt-0 mr-2 font-bold rounded-full bg-[#00ebc7] text-[#00214d]"
        onClick={async () => {
          const lastPostId = posts[posts.length - 1].id;
          const res = await fetch(`/api/posts?take=2&cursor=${lastPostId}`);
          const data = await res.json();
          setPosts([...posts, ...data]);
        }}
      >
        Load more posts
      </button>
    </div>
  );
}
