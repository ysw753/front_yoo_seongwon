"use client";
import { Post } from "@/model/post";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

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
  return <p>zzz</p>;
}
