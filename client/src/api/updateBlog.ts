"use server"
import { Api } from "@/utils/Api";
// Remove: import { toast } from "sonner"; <--- REMOVED
import axios, { AxiosError } from "axios";
import { BlogType } from "@/types/blog";
import { cookies } from "next/headers";

// Define a unified return type for the Server Action
export type BlogResult = {
  success: boolean;
  message: string;
  data: BlogType | null;
};

export async function updateBlog(
  blogId: string,
  formData: FormData
): Promise<BlogResult> {
  try {
    // FIX 1: Correctly await cookies()
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("No token found in cookies");
      return { 
        success: false, 
        message: "Authentication failed. Please log in.", 
        data: null 
      };
    }

    const response = await axios.patch(`${Api}/blogs/${blogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // FIX 2: Return success state and data
    return {
      success: true,
      message: "Blog post updated successfully. Your changes were saved.",
      data: response.data.data as BlogType,
    };

  } catch (error: unknown) {
    console.error("Patch request failed:", error);
    let errorMessage = "Network error. Please try again.";

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      errorMessage = err.response?.data?.message || "Failed to update blog post.";
    }

    // FIX 3: Return failure state and error message
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
}