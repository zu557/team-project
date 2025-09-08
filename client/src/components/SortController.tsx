"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SortController() {
  const router = useRouter();
  const categories = [
    { label: "All", value: "all" },
    { label: "Web-Development", value: "web-development" },
    { label: "Mobile-App", value: "mobile-app" },
    { label: "Machine-Learning", value: "machine-learning" },
    { label: "AI", value: "ai" },
  ];

  const searchParams = useSearchParams();
  const currentSort = searchParams.get("category") || "";
  function handleChange(value: string) {
    router.push(`/projects?category=${value}`);
  }

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] rounded-none">
        <SelectValue placeholder="Sort By:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((categorie, index) => (
            <SelectItem value={categorie.label} key={index}>
              {categorie.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
