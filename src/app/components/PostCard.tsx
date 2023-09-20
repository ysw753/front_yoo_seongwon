import { Post } from "@/model/post";
import { timedefine } from "@/util/date";
import Link from "next/link";
import React from "react";

type Props = { post: Post };
export default function PostCard({ post }: Props) {
  const { id, title, createdAt } = post;
  return (
    <section className="w-full mx-auto  p-4">
      <Link href={`/notification/${id}`}>
        <h1 className="text-base mb-3">
          {title.length > 100 ? title.substring(0, 100) + "..." : title}
        </h1>
        <p className="text-xs text-gray-400">{timedefine(createdAt)}</p>
      </Link>
    </section>
  );
}
