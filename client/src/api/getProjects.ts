import { ProjectType } from "@/components/ProjectList";
import { Api } from "@/utils/Api";
import { toast } from "sonner";

export default async function getProjects(category?: string) {
  try {
    const response = await fetch(`${Api}/projects?category=${category}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.message || "Something went wrong");
      return [];
    }

    const result = await response.json();
    return result.data as ProjectType[];
  } catch (err) {
    console.log(err);

    return [];
  }
}
