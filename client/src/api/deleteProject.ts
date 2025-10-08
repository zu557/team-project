"use server"
import axios, { AxiosError } from "axios";
import { Api } from "@/utils/Api"; // your base URL
import {cookies} from "next/headers"

/* ---------- DELETE ---------- */
export async function deleteProject(id: string) {
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

    const res = await axios.delete(`${Api}/projects/${id}`);
    return true;
  } catch (err) {
    const e = err as AxiosError<{ message?: string }>;
    console.log("failed to deleted Project",e.response?.data?.message)
    return false;
  }
}
