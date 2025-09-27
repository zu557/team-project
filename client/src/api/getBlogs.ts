import { BlogType } from "@/types/blog";
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
  console.log('in the api teh page and sort that transferred as props  : ', page,sort)
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (page !== undefined) params.append("page", page.toString());
  console.log("in the api here the params   : ",params)

  const url = `${Api}/blogs${params.toString() ? `?${params}` : ""}`;
  console.log(" in the api here the frontend url that sent : ",url)
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
