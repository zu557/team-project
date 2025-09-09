import { Api } from "@/utils/Api";
import { toast } from "sonner";
export interface BlogType {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
}
export async function getBlog(blogId: string) {
  const response = await fetch(`${Api}/blogs/${blogId}`);
  if (!response.ok) {
    const errordata = await response.json();
    toast.error(errordata?.message || "Something went wrong");
    return null;
  }
  const result = await response.json();
  return result.data as BlogType;
}
