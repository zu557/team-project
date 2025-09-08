import ProjectList from "@/components/ProjectList";
import SortController from "@/components/SortController";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
interface PageProps {
  searchParams: { category?: string; page?: string };
}
export default function Projects({ searchParams }: PageProps) {
  const currentCategory = searchParams.category || "";
  const page = searchParams.page || "1";

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
            Our Projects
          </h1>
          <p className="text-background text-base md:text-lg leading-relaxed">
            Showcasing the work that drives innovation and growth. Each project
            reflects our focus on building impactful solutions that empower
            businesses to succeed in the digital era
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 space-y-6">
        <div className="flex md:justify-end  justify-center w-full ">
          <SortController />
        </div>
        <Suspense
          fallback={<LoadingSkeleton />}
          key={`${currentCategory}-${page}`}
        >
          <ProjectList category={currentCategory} page={page} />
        </Suspense>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl px-5 mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid  lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="group border border-border shadow-sm bg-card w-full max-w-3xl mx-auto"
        >
          <div className="relative h-60 w-full overflow-hidden">
            <Skeleton className="w-full h-full absolute top-0 left-0" />
            <span className="absolute top-4 left-4">
              <Skeleton className="w-20 h-6" />
            </span>
          </div>
          <div className="px-4 py-6 space-y-4">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center justify-between gap-4 pt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
