import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Api } from "@/utils/Api"; // your base URL
import {ProjectType} from "@/types/project"

/* ---------- DELETE ---------- */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    await axios.delete(`${Api}/projects/${id}`);
    toast.success("Project deleted");
    return true;
  } catch (err) {
    const e = err as AxiosError<{ message?: string }>;
    toast.error(e.response?.data?.message || "Failed to delete project");
    return false;
  }
}
