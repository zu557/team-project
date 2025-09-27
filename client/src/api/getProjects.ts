import { ProjectType } from "@/components/ProjectList";
import { Api } from "@/utils/Api";
import { toast } from "sonner";
/* ---------- GET LIST ---------- */
// export async function getProjects(params?: {
//   sort?: string;
//   page?: string;
// }): Promise<{ data: ProjectType[]; totalPage?: number } | null> {
//   try {
//     const res = await axios.get<{ data: ProjectType[]; totalPage?: number }>(
//       `${Api}/projects`,
//       { params }
//     );
//     return res.data;
//   } catch (err) {
//     const e = err as AxiosError<{ message?: string }>;
//     toast.error(e.response?.data?.message || "Failed to fetch projects");
//     return null;
//   }
// }

interface ProjectProps {
  category?: string;
  page?: string;
}

interface GetProjectResponse {
  data: ProjectType[];
  totalPage: number;
}
export  async function getProjects({ category, page }: ProjectProps) {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (page) params.append("page", page);
  try {
    const response = await fetch(`${Api}/projects?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.message || "Something went wrong");
      return null;
    }

    const result: GetProjectResponse = await response.json();
    return result;
  } catch (err) {
    console.log(err);

    return null;
  }
}
