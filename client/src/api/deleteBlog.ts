"use server"
import { Api } from "@/utils/Api";
// import { toast } from "sonner";
import { cookies } from "next/headers";

/**
 * Delete a blog post by its ID (Server-side only)
 * Returns an object: { success, message }
 */
export async function deleteBlog(blogId: string) {
  try {
    // ✅ cookies() is synchronous
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication failed. Please log in.",
      };
    }

    const response = await fetch(`${Api}/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete blog post:", errorData);
      return {
        success: false,
        message: errorData?.message || "Failed to delete blog post.",
      };
    }

    return {
      success: true,
      message: "Blog post deleted successfully.",
    };
  } catch (error) {
    console.error("Delete request failed:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}
