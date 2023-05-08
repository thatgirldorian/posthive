import timeAgo from "lib/timeago";

export default function Post({ post }) {
  return (
    <p>
      {post.content}
      {timeAgo.format(new Date(post.createdAt))}
    </p>
  );
}
