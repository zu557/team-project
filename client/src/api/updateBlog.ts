"use server"
import { Api } from "@/utils/Api";
// import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { BlogType } from "@/types/blog";
import { cookies } from "next/headers";

export async function updateBlog(
  blogId: string,
  formData: FormData
): Promise<BlogType | null> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value; // ✅ no await

    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    const response = await axios.patch(`${Api}/blogs/${blogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // 🔑 send token
      },
    });

//     toast("Blog post updated successfully", {
//   description: "Your changes were saved.",
// });
    return response.data.data as BlogType;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message || "Failed to update blog post";
//       toast("Failed to update blog post", {
//   description: message,
// });
    } else {
//     toast("Network error. Please try again.", {
//   description: "Please check your connection and retry.",
// });
    }
    console.error("Patch request failed:", error);
    return null;
  }
}
