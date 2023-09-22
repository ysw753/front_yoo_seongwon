"use client";
import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";

import "./write.css";
import { Post } from "@/model/post";
//import extractTextFromHTML from "@/util/extractTextFromHtml";

type InputData = {
  title?: string;
  content?: string;
  image?: string;
};

type Props = {
  post?: Post | null;
  state: string;
};

export default function Editor({ post, state }: Props) {
  console.log(post);
  const router = useRouter();

  const [inputData, setInputData] = useState<InputData>({
    title: post?.title || "",
    content: post?.content || "",
    image: post?.image || "",
  });
  // useEffect(() => {
  //   setInputData({
  //     title: post?.title || "",
  //     content: post?.content || "",
  //     image: post?.image || "",
  //   });
  // }, []);

  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string;
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file: any) => {
              body.append("file", file);
              body.append("upload_preset", preset);
              fetch(`${url}`, {
                method: "POST",
                body: body,
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log("asdasdsad", res.url);
                  resolve({ default: `${res.url}` });
                });
            })
            .catch((err: any) => reject(err));
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  const saveHandler = () => {
    if (inputData.title === "") {
      alert("타이틀은 필수 입니다.");
    }

    const postobj = {
      title: inputData.title as string,
      //content: extractTextFromHTML(inputData.content as string),
      content: inputData.content as string,
      image: inputData.image,
    };

    if (state === "update") {
      fetch(`/api/update/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postobj),
      }).then((res) => {
        console.log(res);
        router.push("/notification");
      });
    } else if (state === "create") {
      fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postobj),
      }).then((res) => {
        console.log(res);
        router.push("/notification");
      });
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
        //data=""
        data={inputData.content}
        config={{ extraPlugins: [uploadPlugin] }}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          // 이미지 URL 추출
          const imageUrls: string[] = [];
          const parser = new DOMParser();
          const parsedHtml = parser.parseFromString(data, "text/html");
          const imgElements = parsedHtml.querySelectorAll("img");
          imgElements.forEach((img) => {
            const imageUrl = img.getAttribute("src");
            if (imageUrl) {
              imageUrls.push(imageUrl);
            }
          });
          setInputData((prev) => ({
            ...prev,
            content: data,
            image: imageUrls ? imageUrls[0] : "",
          }));
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
