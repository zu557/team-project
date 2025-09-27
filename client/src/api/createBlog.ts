import { Api } from "@/utils/Api";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

export interface BlogType {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  author: string;
  categories?: string;
}

/**
 * Create a new blog post.
 * @param formData - A FormData object prepared in the UI.
 */
export async function createBlog(formData: FormData): Promise<BlogType | null> {
  try {
    const response = await axios.post(`${Api}/blogs`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Blog post created successfully");
    return response.data.data as BlogType;
  } catch (error: unknown) {
    // ✅ Narrow type to AxiosError so we can safely access response
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Failed to create blog post";
      toast.error(message);
    } else {
      toast.error("Network error. Please try again.");
    }
    console.error("Create request failed:", error);
    return null;
  }
}
