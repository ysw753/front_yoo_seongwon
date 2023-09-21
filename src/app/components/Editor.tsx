"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./write.css";

type InputData = {
  title?: string;
  content?: string;
};

export default function Editor() {
  const router = useRouter();
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    content: "",
  });
  const saveHandler = () => {
    if (inputData.title === "") {
      alert("타이틀은 필수 입니다.");
    }
  };
  return (
    <section className="w-[60%] m-auto h-full p-4">
      <input
        value={inputData.title}
        onChange={(e) =>
          setInputData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="title을 입력해주세요"
        className="border w-full h-[30px] mb-3"
        type="text"
      />
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setInputData((prev) => ({ ...prev, content: data }));
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <button
        onClick={() => router.push("/notification")}
        className="border rounded-md p-2 border-gray-200 bg-white"
      >
        취소
      </button>
      <button
        onClick={saveHandler}
        className=" rounded-md p-2 text-white m-3 bg-orange-500"
      >
        저장
      </button>
    </section>
  );
}
