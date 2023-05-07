import timeago from "lib/timeago";

export default function Post({ post }) {
  return (
    <p>
      {post.content}
      {timeago.format(new Date(post.createdAt))}
    </p>
  );
}
