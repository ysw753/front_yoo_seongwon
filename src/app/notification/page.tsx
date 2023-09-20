"use client";
import { Post } from "@/model/post";
import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";

export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          setPosts([]);
        } else {
          setPosts(data);
        }
      });
  }, []);

  return (
    <section className="max-w-screen-xl overflow-auto mx-auto">
      <div className="flex justify-between p-4 mt-5 border-b border-gray-400">
        <h1 className="font-bold text-3xl">공지사항</h1>
        <input
          className="text-xl p-2 outline-none border border-gray-600 rounded-md"
          type="text"
          placeholder="검색어"
        />
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
