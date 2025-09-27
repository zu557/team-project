import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Api } from "@/utils/Api"; // your base URL
import {ProjectType} from "@/types/project"



/* ---------- CREATE ---------- */
export async function createProject(
  formData: FormData
): Promise<ProjectType | null> {
  try {
    const res = await axios.post<ProjectType>(`${Api}/projects`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Project created successfully");
    return res.data;
  } catch (err) {
    const e = err as AxiosError<{ message?: string }>;
    toast.error(e.response?.data?.message || "Failed to create project");
    return null;
  }
}


