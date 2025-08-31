"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  // Example array of blogs

  const projects = [
    {
      id: 1,
      title: "Team Collaboration Platform",
      description:
        "A real-time platform for teams to chat, share files, and manage tasks.",
      category: "Web App",
      deployment: "https://team-collab.example.com",
      github: "https://github.com/company/team-collab",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "E-Commerce Storefront",
      description:
        "A scalable online shop with payment integration and admin dashboard.",
      category: "E-Commerce",
      deployment: "https://shop.example.com",
      github: "https://github.com/company/ecommerce-storefront",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A personal portfolio site for showcasing projects and skills.",
      category: "Portfolio",
      deployment: "https://portfolio.example.com",
      github: "https://github.com/company/portfolio-site",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Restaurant Reservation System",
      description:
        "Book tables, view menus, and manage reservations for restaurants.",
      category: "Booking",
      deployment: "https://reserve.example.com",
      github: "https://github.com/company/restaurant-reservation",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Fitness Tracker App",
      description:
        "Track workouts, set goals, and monitor progress with analytics.",
      category: "Mobile App",
      deployment: "https://fittrack.example.com",
      github: "https://github.com/company/fitness-tracker",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Blog Platform",
      description:
        "Create, edit, and share articles with a rich text editor and comments.",
      category: "Content",
      deployment: "https://blog.example.com",
      github: "https://github.com/company/blog-platform",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 7,
      title: "Event Management Tool",
      description: "Organize events, sell tickets, and manage attendees.",
      category: "Events",
      deployment: "https://events.example.com",
      github: "https://github.com/company/event-management",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 8,
      title: "Customer Support Portal",
      description:
        "A ticketing system for customer queries and support tracking.",
      category: "Support",
      deployment: "https://support.example.com",
      github: "https://github.com/company/support-portal",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 9,
      title: "Online Learning Platform",
      description: "Host courses, track progress, and issue certificates.",
      category: "Education",
      deployment: "https://learn.example.com",
      github: "https://github.com/company/online-learning",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 10,
      title: "Inventory Management System",
      description: "Monitor stock levels, suppliers, and automate reordering.",
      category: "Business",
      deployment: "https://inventory.example.com",
      github: "https://github.com/company/inventory-management",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 11,
      title: "Weather Dashboard",
      description:
        "Get real-time weather updates and forecasts for any location.",
      category: "Dashboard",
      deployment: "https://weather.example.com",
      github: "https://github.com/company/weather-dashboard",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 12,
      title: "Travel Booking Portal",
      description:
        "Search and book flights, hotels, and car rentals worldwide.",
      category: "Travel",
      deployment: "https://travel.example.com",
      github: "https://github.com/company/travel-booking",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const projectFilter = [
    {
      id: 1,
      title: "How to Build Modern Web Apps",
      description:
        "A practical guide to building scalable and maintainable web applications using React and Node.js.",
      category: "Development",
      timestamp: "2025-08-31T09:00:00Z",
    },
    {
      id: 2,
      title: "UI/UX Trends for 2025",
      description:
        "Explore the latest design trends and best practices for creating user-friendly interfaces.",
      category: "Design",
      timestamp: "2025-08-30T14:30:00Z",
    },
    {
      id: 3,
      title: "Getting Started with TypeScript",
      description:
        "Learn the basics of TypeScript and how it can improve your JavaScript projects.",
      category: "Programming",
      timestamp: "2025-08-29T11:15:00Z",
    },
    {
      id: 4,
      title: "Effective Remote Collaboration",
      description:
        "Tips and tools for working efficiently with distributed teams.",
      category: "Productivity",
      timestamp: "2025-08-28T16:45:00Z",
    },
  ];
  const categories = [
    "All",
    ...Array.from(new Set(projectFilter.map((filter) => filter.category))),
  ];
  return (
    <div className=" space-y-12 ">
      <div
        className="h-92 relative  flex  flex-col justify-center items-center "
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute text-center inset-0 bg-black/70 z-0" />
        <div className="z-100 text-center space-y-4">
          <h1 className="text-3xl text-primary md:text-4xl lg:text-5xl font-bold">
            Our Blogs
          </h1>
          <p className="text-background">
            Insights, updates, and expert advice from our team to help your
            business grow.
          </p>
        </div>
      </div>
      <div className="flex md:justify-end  justify-center w-full ">
        <div className="flex items-center  gap-3 ">
          <Select>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectGroup key={index}>
                  <SelectItem value={category}>{category}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid  lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

interface ProjectType {
  title: string;
  description: string;
  category: string;
  coverImage: string;
  github: string;
  deployment: string;
}

interface ProjectCardProps {
  project: ProjectType;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card w-full max-w-3xl mx-auto">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-primary text-background text-xs font-semibold px-3 py-1 shadow-sm">
          {project.category}
        </span>
      </div>

      <div className="px-8 py-6 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-4">
          <Link
            href={project.github}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Github size={18} /> GitHub
          </Link>
          <Link
            href={project.deployment}
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
