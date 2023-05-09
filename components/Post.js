import timeAgo from "lib/timeago";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <p>
      {post.author.image && (
        <Image
          src={post.author.image}
          alt={post.author.name}
          width={40}
          height={40}
        />
      )}
      {timeAgo.format(new Date(post.createdAt))} {post.author.name}{" "}
      {post.content}
    </p>
  );
}
