import {getProjects} from "@/api/getProjects";
import { ExternalLink, Github } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import PaginationBar from "./PaginationBar";
import {ProjectType} from "@/types/project"

export default async function ProjectList({
  category,
  page = "1",
}: {
  category: string;
  page: string;
}) {
  const response = await getProjects({ category, page });

  if (!response || !response.data || response.data.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-muted-foreground mb-4">
          No projects found.
        </h2>
        <p className="text-muted-foreground">
          Try changing your filter or check back later for new projects.
        </p>
      </div>
    );
  }

  const { data, totalPage } = response;

  return (
    <div className="space-y-4">
      <div className="max-w-7xl px-5 mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid  lg:grid-cols-3 xl:grid-cols-3">
        {data.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      <PaginationBar currentPage={Number(page)} totalPage={totalPage} />
    </div>
  );
}


interface ProjectCardProps {
  project: ProjectType;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card w-full max-w-3xl mx-auto">
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={project?.imageUrl}
          alt={project.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-primary text-background text-xs font-semibold px-3 py-1 shadow-sm">
          {project.category}
        </span>
      </div>

      <div className="px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-4">
          {project.githubLink && <Link
            href={project.githubLink}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Github size={18} /> GitHub
          </Link>}
          <Link
            href={project.deploymentLink}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium border hover:bg-primary hover:text-background transition-colors"
          >
            <ExternalLink size={18} /> Live Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
