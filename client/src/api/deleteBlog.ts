import { Api } from "@/utils/Api";
import { toast } from "sonner";

/**
 * Delete a blog post by its ID.
 * Returns true if successful, false otherwise.
 */
export async function deleteBlog(blogId: string): Promise<boolean> {
  try {
    const response = await fetch(`${Api}/blogs/${blogId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.message || "Failed to delete blog post");
      return false;
    }

    toast.success("Blog post deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete request failed:", error);
    toast.error("Network error. Please try again.");
    return false;
  }
}
