"use client";

import { RiSearchLine } from "react-icons/ri";

import { Post } from "@/model/post";
import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";

export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [keyword, setKeyword] = useState("");
  const debouncedKey = useDebounce(keyword);

  const getSearchHandler = () => {
    fetch(`http://localhost:3000/api/postsearch/${debouncedKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          setPosts([]);
        } else {
          setPosts(data);
        }
      });
  };

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
    <section className="max-w-screen-xl w-[60%] overflow-auto mx-auto">
      <div className="relative flex justify-between p-4 mt-5 border-b border-gray-400">
        <h1 className="font-bold text-3xl">공지사항</h1>
        <input
          className=" text-xl p-2 outline-none border border-gray-600 rounded-md"
          type="text"
          placeholder="검색어"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2"
          onClick={getSearchHandler}
        >
          <RiSearchLine className="w-6 h-6 text-gray-400" />
        </button>
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
