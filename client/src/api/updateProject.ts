"use server";
import axios, { AxiosError } from "axios";
import { Api } from "@/utils/Api"; // your base URL
import { ProjectType } from "@/types/project";
import { cookies } from "next/headers";

export type ProjectResult = {
  success: boolean;
  message: string;
  data: ProjectType | null;
};

/* ---------- UPDATE ---------- */
export async function updateProject(
  id: string,
  formData: FormData
): Promise<ProjectResult> {
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

    const res = await axios.patch(`${Api}/projects/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: "project updated successfully. Your changes were saved.",
      data: res.data as ProjectType,
    };
  } catch (error: unknown) {
    console.error("Patch request failed:", error);
    let errorMessage = "Network error. Please try again.";

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      errorMessage = err.response?.data?.message || "Failed to update project.";
    }

    // FIX 3: Return failure state and error message
    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
}
