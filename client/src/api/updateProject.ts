import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Api } from "@/utils/Api"; // your base URL
import {ProjectType} from "@/types/project"


/* ---------- UPDATE ---------- */
export async function updateProject(
  id: string,
  formData: FormData
): Promise<ProjectType | null> {
  try {
    const res = await axios.patch<ProjectType>(
      `${Api}/projects/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success("Project updated successfully");
    return res.data;
  } catch (err) {
    const e = err as AxiosError<{ message?: string }>;
    toast.error(e.response?.data?.message || "Failed to update project");
    return null;
  }
}
