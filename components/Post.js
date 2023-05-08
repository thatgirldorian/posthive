import timeAgo from "lib/timeago";

export default function Post({ post }) {
  return (
    <p>
      {timeAgo.format(new Date(post.createdAt))} {post.author.email}{" "}
      {post.content}
    </p>
  );
}
