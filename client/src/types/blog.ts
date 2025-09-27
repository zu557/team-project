// src/types/blog.ts
export interface BlogType {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  categories?: string;
  coverImage?: string;
}
