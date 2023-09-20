import { Post } from "@/model/post";
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

function timedefine(time: string): string {
  //현재시간

  let today = new Date();
  let currentSecond = today.getSeconds(); //초

  let createdtime = new Date("2023-01-06 16:20:30");
  let createdSecond = createdtime.getSeconds(); //초
  let diff = currentSecond - createdSecond;

  if (diff < 60) return "방금 전";
  else if (diff < 120) return "1분 전";
  else if (diff < 180) return "2분 전";
  else if (diff < 3660) return "1시간 전";
  else if (diff < 86400) return "23시간 전";
  else return "2023.01.06";
}
