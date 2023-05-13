import timeAgo from "lib/timeago";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post, nolink }) {
  return (
    <div className="mb-4">
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div className="flex-shrink-0 block group">
          <div className="flex items-center">
            <div>
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className="ml-3 -mt-6">
              <p>
                <Link href={`/${post.author.name}`}>
                  <span className="text-base font-medium leading-6 color-primary hover:underline">
                    {post.author.name}{" "}
                  </span>
                </Link>

                <span className="pl-1 text-sm font-light leading-5 color-dimmed">
                  {nolink ? (
                    <span>{timeAgo.format(new Date(post.createdAt))}</span>
                  ) : (
                    <Link
                      legacyBehavior
                      href={`/${post.author.name}/status/${post.id}`}
                    >
                      <a className="hover:underline">
                        {timeAgo.format(new Date(post.createdAt))}
                      </a>
                    </Link>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-16 -mt-6">
        <p className="flex-shrink pl-1 pr-2 text-base font-normal color-primary width-auto">
          {post.content}
        </p>
      </div>
    </div>
  );
}
