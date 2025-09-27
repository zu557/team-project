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
 * Update an existing blog post with a FormData payload.
 * @param blogId - The blog's unique ID.
 * @param formData - A FormData object prepared in the UI.
 */
export async function updateBlog(
  blogId: string,
  formData: FormData
): Promise<BlogType | null> {
  try {
    const response = await axios.patch(`${Api}/blogs/${blogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Blog post updated successfully");
    return response.data.data as BlogType;
  } catch (error: unknown) {
    // ✅ Narrow the error to an AxiosError so we can safely access .response
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Failed to update blog post";
      toast.error(message);
    } else {
      toast.error("Network error. Please try again.");
    }
    console.error("Patch request failed:", error);
    return null;
  }
}
