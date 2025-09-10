import { getBlogs } from "@/api/getBlogs";
import PaginationBar from "@/components/PaginationBar";
import BlogsSort from "@/components/SortBlogs";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import { Suspense } from "react";
interface pageProps {
  searchParams: Promise<{ sort?: string; page?: string }>;
}

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Latest Blogs & Insights | Debbal",
  description:
    "Explore Debbal's latest blogs and insights on web development, UI/UX design, cloud solutions, full stack education, and digital transformation trends.",
};

export default async function Blogs({ searchParams }: pageProps) {
  const { sort, page } = await searchParams;
  return (
    <div className=" space-y-12 ">
      <div className="relative h-[23rem] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80")',
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center max-w-2xl px-4 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Our Latest Insights
          </h1>
          <p className="text-background text-base md:text-lg leading-relaxed">
            Dive into a world of knowledge with our curated articles on web
            development, design, and industry trends.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 space-y-10 py-10">
        <div className="flex md:justify-end justify-center w-full ">
          <BlogsSort currentSort={sort} />
        </div>
        <div>
          <Suspense fallback={<LoadingSkeleton />} key={`${sort}-${page}`}>
            <BlogsContent sort={sort} page={page} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function BlogsContent({
  sort,
  page = "1",
}: {
  sort?: string;
  page?: string;
}) {
  const response = await getBlogs({ sort, page });
  if (!response?.data && response?.data.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-muted-foreground mb-4">
          No Blogs found.
        </h2>
        <p className="text-muted-foreground">
          Try changing your filter or check back later for new projects.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="max-w-6xl px-5 mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid lg:grid-cols-2 xl:grid-cols-3">
        {response?.data.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <PaginationBar
        currentPage={Number(page)}
        totalPage={response?.totalPage}
      />
    </div>
  );
}
export interface BlogType {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
}

interface BlogCardProps {
  blog: BlogType;
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${blog._id}`}
      className="group border border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card w-full max-w-3xl mx-auto flex flex-col"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-1 px-5 py-6 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {blog.description}
        </p>
        <div className="mt-4">
          <span className="text-primary flex items-center gap-1 font-medium text-sm group-hover:underline">
            Read More <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl px-5 mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="group border border-border shadow-sm bg-card w-full max-w-3xl mx-auto flex flex-col animate-pulse"
        >
          <div className="relative h-60 w-full overflow-hidden">
            <Skeleton className="w-full h-full absolute top-0 left-0" />
          </div>

          <div className="flex flex-col flex-1 px-5 py-6 space-y-3">
            <Skeleton className="h-6 w-2/3 rounded" />

            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />

            <div className="mt-4 w-24">
              <Skeleton className="h-5 w-full rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
