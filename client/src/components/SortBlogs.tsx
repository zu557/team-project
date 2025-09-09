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

export default function BlogsSort({
  currentSort = "",
}: {
  currentSort?: string;
}) {
  const router = useRouter();
  const sorts = [
    {
      label: "Recent",
      value: "new",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
  ];
  function handleSort(value: string) {
    router.push(`?sort=${value}`);
  }
  return (
    <div className="flex items-center gap-3 ">
      <Select value={currentSort} onValueChange={handleSort}>
        <SelectTrigger className="w-[180px] cursor-pointer rounded-none">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sorts.map((sort, index) => (
              <SelectItem value={sort.value} key={index}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
