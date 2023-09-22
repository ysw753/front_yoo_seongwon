// 포스트 타입 정리

export type Post = {
  id: string;
  title: string;
  image: string;
  content: string;
  createdAt: string;
};

export type SinglePost = {
  title: string;
  image: string;
  content: string;
};
