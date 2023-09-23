"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex items-center gap-10 ">
        <button onClick={() => router.replace("/notification")}>
          <h1 className="text-3xl font-bold text-white">BlockSmith</h1>
        </button>
        <Link href="/notification">
          <p className="text-white">홈</p>
        </Link>
      </div>

      <nav className="flex gap-6 justify-center items-center">
        <Link href="/notification">
          <h1 className=" font-bold text-white">공지</h1>
        </Link>
        <Link href="/alarm">
          <p className="text-white">알림</p>
        </Link>
        <Link href="/myinfo">
          <p className="text-white">내정보</p>
        </Link>
      </nav>
    </div>
  );
}
