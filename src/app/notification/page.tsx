"use client";

import { RiSearchLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { Post } from "@/model/post";
import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Empty from "../components/Empty";

const GROUP_SIZE = 5;

export default function NotificationPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  //데이터 로딩중
  const [isLoading, setIsLoading] = useState(true);
  //데이터 없을때
  const [isData, setIsData] = useState(true);

  const [keyword, setKeyword] = useState("");
  const debouncedKey = useDebounce(keyword, 100);

  const [pageArray, setPageArray] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [groupIndex, setGroupIndex] = useState(0);

  // 모든데이터 받아오는 fetch함수
  const initfetch = () => {
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
        setIsLoading(false);
        if (!data || data === undefined || data.length === 0) {
          setPosts([]);
          setIsData(false);
        } else {
          setPosts(data.posts);
          setIsData(true);
          setPageArray(makePageArray(data.totalPostsCount, 10));
        }
      });
  };

  // 검색 필터링기능
  const getSearchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword !== "") {
      console.log("눌림");
      fetch(`http://localhost:3000/api/postsearch/${debouncedKey}`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          if (!data || data === undefined || data.length === 0) {
            setPosts([]);
            setIsData(false);
          } else {
            setPosts(data);
            setPageArray(makePageArray(data.totalPostsCount, 10));
            setIsData(true);
            setPageIndex(1);
            setGroupIndex(0);
          }
        });
    }
    if (e.key === "Enter" && keyword === "") {
      initfetch();
    }
  };

  // 검색키워드 삭제 , 초기데이터 다시불러옴
  const deleteKeyword = () => {
    setKeyword("");
    initfetch();
  };

  // 페이지 번호 클릭시 페이지 이동
  const goPage = (pageNum: number) => {
    setPageIndex(pageNum);
  };

  // >> 페이지이동
  const nextGroupHandler = () => {
    if (groupIndex < Math.floor(pageArray.length / GROUP_SIZE)) {
      //setGroupIndex(Math.floor(pageIndex / GROUP_SIZE) + 1);
      setGroupIndex((prev) => prev + 1);
      setPageIndex((groupIndex + 1) * GROUP_SIZE + 1);
    }
  };
  // << 페이지이동
  const prevGroupHandler = () => {
    if (groupIndex > 0) {
      setGroupIndex((prev) => prev - 1);
      setPageIndex((groupIndex - 1) * GROUP_SIZE + 1);
    }
  };

  // > 페이지이동
  const nextHandler = () => {
    if (pageIndex < pageArray.length) {
      setPageIndex((prev) => prev + 1);
      setGroupIndex(Math.floor(pageIndex / GROUP_SIZE));
    }
  };

  // < 페이지이동
  const prevHandler = () => {
    if (pageIndex > 1) {
      setPageIndex((prev) => prev - 1);

      setGroupIndex(Math.floor((pageIndex - 2) / GROUP_SIZE));
      console.log(pageIndex - 1);
    }
  };

  //초기 데이터불러오기
  useEffect(() => {
    initfetch();
  }, [pageIndex]);

  return (
    <section className="max-w-screen-xl w-[60%] overflow-auto mx-auto">
      <div className="relative min-w-[560px] flex justify-between p-4 mt-5 border-b border-gray-400">
        <h1 className="font-bold text-3xl">공지사항</h1>

        <input
          className=" text-xl p-2 outline-none border border-gray-600 rounded-md"
          type="text"
          placeholder="검색어"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={getSearchHandler}
        />
        <button className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
          {!keyword ? (
            <RiSearchLine className="w-6 h-6 text-gray-400 " />
          ) : (
            <TiDelete
              onClick={deleteKeyword}
              className="w-6 h-6 text-gray-400 hover:text-black"
            />
          )}
        </button>
      </div>
      <div className="mb-[50px]">
        <Link className=" float-right m-2 z-10" href={"/write"}>
          <p className="hover:bg-[#EFF0F3] hover:text-black  bg-black text-white rounded-md p-1 mr-2">
            글쓰기
          </p>
        </Link>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] ">
          <PropagateLoader size={8} color="orange" />
        </div>
      )}
      {!isData && <Empty text={"공지사항이 없습니다"} />}
      <ul className="min-h-screen">
        {posts.map((post) => (
          <li className="hover:bg-[#EFF0F3]" key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="text-gray-400 m-3"
          onClick={prevGroupHandler}
        >{`<<`}</button>
        <button className="text-gray-400" onClick={prevHandler}>{`<`}</button>
        {pageArray
          .slice(groupIndex * GROUP_SIZE, groupIndex * GROUP_SIZE + GROUP_SIZE)
          .map((item) => (
            <button
              key={item}
              onClick={() => goPage(item)}
              className={`m-4 ${pageIndex === item ? "bg-gray-200" : ""} `}
            >
              {item}
            </button>
          ))}
        <button className="text-gray-400" onClick={nextHandler}>{`>`}</button>
        <button
          className="text-gray-400 m-3"
          onClick={nextGroupHandler}
        >{`>>`}</button>
      </div>
    </section>
  );
}
function makePageArray(itemCounts: number, size: number) {
  itemCounts = Math.ceil(itemCounts / size);
  let pageCountsArray = Array.from(
    { length: itemCounts },
    (_, index) => index + 1
  );
  if (pageCountsArray.length === 0) pageCountsArray = [1];
  return pageCountsArray;
}
