import Post from "./Post";

export default function Posts({ posts, nolink }) {
  if (!posts) return null;

  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} post={post} nolink={nolink} />
      ))}
    </>
  );
}
