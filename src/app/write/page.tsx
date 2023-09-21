"use client";

import dynamic from "next/dynamic";

export default function WritePage() {
  const Editor = dynamic(() => import("@/app/components/Editor"), {
    ssr: false,
  });
  return <Editor />;
}
