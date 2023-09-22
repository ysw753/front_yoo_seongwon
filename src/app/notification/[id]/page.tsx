"use client";
import { Post } from "@/model/post";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { timedefine } from "@/util/date";
import extractTextFromHTML from "@/util/extractTextFromHtml";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};

export default function NotificationDetail({ params: { id } }: Props) {
  const [post, setPost] = useState<Post>();
  const router = useRouter();

  console.log(id);

  const deleteHandler = () => {
    fetch("http://localhost:3000/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id }),
    }).then((res) => console.log(res));
  };

  const updateHandler = () => {
    router.push(`/write/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          alert("게시물이 존재하지 않습니다.");
          redirect("/notification");
        } else {
          console.log(data);
          setPost({ ...data, content: data.content });
        }
      });
  }, []);
  return (
    <section className="flex flex-col w-[60%] mx-auto  p-4">
      <div className=" border-solid border-b-2 mb-4">
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

      <div className="min-h-[600px] overflow-y-auto p-4 mb-1">
        {post?.image && (
          <Image
            className="object-cover"
            src={post.image}
            alt={`postimage`}
            priority
            width={200}
            height={300}
          />
        )}
        {post && <p>{extractTextFromHTML(post?.content)}</p>}
      </div>
      <div>
        <button
          onClick={() => router.push("/notification")}
          className="bg-white m-1 p-2 rounded-md border-gray-300 border"
        >
          목록으로
        </button>
        <button
          onClick={updateHandler}
          className="bg-orange-500 text-white m-1 p-2 rounded-md"
        >
          수정
        </button>
        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white m-1 p-2 rounded-md"
        >
          삭제
        </button>
      </div>
    </section>
  );
}
