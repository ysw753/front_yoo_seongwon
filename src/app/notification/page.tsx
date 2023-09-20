"use client";

import { RiSearchLine } from "react-icons/ri";

import { Post } from "@/model/post";
import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";

const GROUP_SIZE = 5;

export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [keyword, setKeyword] = useState("");
  const debouncedKey = useDebounce(keyword);

  const [pageArray, setPageArray] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [groupIndex, setGroupIndex] = useState(0);

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

  //페이지 번호별
  const goPage = (pageNum: number) => {
    setPageIndex(pageNum);
  };

  const nextGroupHandler = () => {
    if (groupIndex < Math.floor(pageArray.length / GROUP_SIZE)) {
      setGroupIndex(Math.floor(pageIndex / GROUP_SIZE) + 1);
      setPageIndex((prev) => Math.floor(prev / GROUP_SIZE) + 1 + GROUP_SIZE);
    }
  };
  const prevGroupHandler = () => {
    if (groupIndex > 0) {
      setGroupIndex((prev) => prev - 1);
      setPageIndex(groupIndex);
    }
  };

  const nextHandler = () => {
    if (pageIndex < pageArray.length) {
      setPageIndex((prev) => prev + 1);
      setGroupIndex(Math.floor(pageIndex / GROUP_SIZE));
    }
  };
  const prevHandler = () => {
    if (pageIndex > 1) {
      setPageIndex((prev) => prev - 1);
      setGroupIndex((prev) =>
        prev > Math.floor((pageIndex - 2) / GROUP_SIZE) ? prev - 1 : prev
      );
      console.log(pageIndex - 1);
    }
  };
  useEffect(() => {
    const data = {
      pageindex: pageIndex,
      pagesize: 10,
    };
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || data === undefined) {
          setPosts([]);
        } else {
          setPosts(data.posts);

          setPageArray(makePageArray(data.totalPostsCount, 10));
        }
      });
  }, [pageIndex]);

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
      <button
        className="text-gray-400 m-3"
        onClick={prevGroupHandler}
      >{`<<`}</button>
      <button className="text-gray-400" onClick={prevHandler}>{`<`}</button>
      {pageArray
        .slice(groupIndex * GROUP_SIZE, groupIndex * GROUP_SIZE + GROUP_SIZE)
        .map((item) => (
          <button key={item} onClick={() => goPage(item)} className="m-4">
            {item}
          </button>
        ))}
      <button className="text-gray-400" onClick={nextHandler}>{`>`}</button>
      <button
        className="text-gray-400 m-3"
        onClick={nextGroupHandler}
      >{`>>`}</button>
    </section>
  );
}
function makePageArray(itemCounts: number, size: number) {
  itemCounts = Math.ceil(itemCounts / size);
  const pageCountsArray = Array.from(
    { length: itemCounts },
    (_, index) => index + 1
  );

  return pageCountsArray;
}
