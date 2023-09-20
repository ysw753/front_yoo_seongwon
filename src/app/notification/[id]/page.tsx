"use client";
import { Post } from "@/model/post";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { timedefine } from "@/util/date";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  const [post, setPost] = useState<Post>();
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          alert("게시물이 존재하지 않습니다.");
          redirect("/notification");
        } else {
          console.log(data);
          setPost(data);
        }
      });
  }, []);
  return (
    <section className="w-[60%] mx-auto  p-4">
      <div className="border-solid border-b-2 mb-4">
        <h1 className="text-xl font-bold mb-4 ">
          {post &&
            (post.title.length > 100
              ? post.title.substring(0, 100) + "..."
              : post.title)}
        </h1>
        <p className="mb-4 text-xs text-gray-400 ">
          {timedefine(post?.createdAt)}
        </p>
      </div>
      <p>{post?.content}</p>
    </section>
  );
}
