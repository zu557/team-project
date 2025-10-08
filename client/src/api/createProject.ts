"use server"
import axios, { AxiosError } from "axios";
import { Api } from "@/utils/Api"; // your base URL
import {ProjectType} from "@/types/project"
import {cookies} from "next/headers"

export type ProjectResult = {
  success: boolean;
  message: string;
  data: ProjectType | null;
};


/* ---------- CREATE ---------- */
export async function createProject(
  formData: FormData
):Promise<ProjectResult> {
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
    const res = await axios.post<ProjectType>(`${Api}/projects`, formData, {
      headers: { "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
       },
    });
    console.log("Project created successfully");
    return {
      success: true,
      message: "project created successfully. ",
      data: res.data as ProjectType,
    };
  } catch (error: unknown) {
      console.error("Post request failed:", error);
      let errorMessage = "Network error. Please try again.";
  
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string }>;
        errorMessage = err.response?.data?.message || "Failed to create project.";
      }
  
      // FIX 3: Return failure state and error message
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
}


