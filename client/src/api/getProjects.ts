import { ProjectType } from "@/components/ProjectList";
import { Api } from "@/utils/Api";
import { toast } from "sonner";
interface ProjectProps {
  category?: string;
  page?: string;
}

interface GetProjectResponse {
  data: ProjectType[];
  totalPage: number;
}
export default async function getProjects({ category, page }: ProjectProps) {
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
