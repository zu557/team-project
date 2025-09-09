import { BlogType } from "@/app/blogs/page";
import { Api } from "@/utils/Api";
import { toast } from "sonner";

interface SortProps {
  sort?: string;
  page?: string; // added page
}

interface GetBlogsResponse {
  data: BlogType[];
  totalPage: number;
}

export async function getBlogs({ sort, page }: SortProps) {
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (page !== undefined) params.append("page", page.toString());

  const url = `${Api}/blogs${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(
      errorData?.message || "Something went wrong. Please try again."
    );
    return null;
  }

  const result: GetBlogsResponse = await response.json();
  return result;
}
