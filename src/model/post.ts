// 포스트 타입 정리

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type SinglePost = {
  title: string;
  content: string;
};
