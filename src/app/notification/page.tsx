import PostCard from "../components/PostCard";

const posts = [
  {
    id: "1",
    title:
      "one 오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    detail: "오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    createdAt: "2023.09.13",
  },
  {
    id: "2",
    title: "two",
    detail: "오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    createdAt: "2023.09.13",
  },
  {
    id: "3",
    title: "three",
    detail: "오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    createdAt: "2023.09.13",
  },
  {
    id: "4",
    title: "four",
    detail: "오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    createdAt: "2023.09.13",
  },
  {
    id: "5",
    title: "five",
    detail: "오랜만에 사용하는 레파지토리에 코딩을 하고 commit push를 했다.",
    createdAt: "2023.09.13",
  },
];

export default function page() {
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
