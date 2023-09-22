"use client";
import { Post } from "@/model/post";
import extractTextFromHTML from "@/util/extractTextFromHtml";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function UpdatePage({ params: { id } }: Props) {
  const [post, setPost] = useState<Post>();
  console.log(post);
  // params로 아이디를 받는다
  // 아이디로 게시물을 찾는다
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          alert("게시물이 존재하지 않습니다.");
        } else {
          console.log(data);
          setPost({ ...data, content: data.content });
        }
      });
  }, []);

  // Editor에 넘겨준다
  const Editor = dynamic(() => import("@/app/components/Editor"), {
    ssr: false,
  });

  return post ? <Editor post={post} state={"update"} /> : null;
}
