"use server"
import { Api } from "@/utils/Api";
import axios, { AxiosError } from "axios";
import {BlogType} from "@/types/blog"
import {cookies } from "next/headers"

export type BlogResult = {
  success: boolean;
  message: string;
  data: BlogType | null;
};

export async function createBlog(formData: FormData):Promise<BlogResult>{
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      console.log("No token found in cookies");
      return {
        success: false,
        message: "Authentication failed. Please log in.",
        data: null,
      };
    }
    const response = await axios.post(`${Api}/blogs`, formData, {
      headers: { "Content-Type": "multipart/form-data" ,
        Authorization:`Bearer ${token}`
      },
    });
    return {
          success: true,
          message: "Blog post created successfully.",
          data: response.data.data as BlogType,
        };
  } catch (error: unknown) {
    // ✅ Narrow type to AxiosError so we can safely access response
    console.error("Create request failed:", error);

    let message = "Network error. Please try again.";
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Failed to create blog post";
      console.log("Failed to create Blog post ",  err.response?.data?.message)
    }
    return {
      success: false,
      message: message,
      data: null,
    };
  }
}
