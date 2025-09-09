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
import Link from "next/link";
import { useState } from "react";

export default function Blogs() {
  const [sortOrder, setSortOrder] = useState("recent");

  const blogs = [
    {
      id: 1,
      title: "Mastering React Hooks: A Deep Dive",
      description:
        "Unlock the full potential of React development with an in-depth exploration of custom hooks and their applications.",
      coverImage:
       "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-15T10:00:00Z",
    },
    {
      id: 2,
      title: "The Future of AI in Web Development",
      description:
        "Discover how artificial intelligence is reshaping the landscape of web development, from code generation to personalized user experiences.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-20T14:30:00Z",
    },
    {
      id: 3,
      title: "Building Accessible Websites: A Comprehensive Guide",
      description:
        "Learn essential techniques and best practices to create inclusive web experiences for all users, regardless of ability.",
      coverImage:
       "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-10T09:15:00Z",
    },
    {
      id: 4,
      title: "Optimizing Performance in Next.js Applications",
      description:
        "Boost your Next.js app's speed and efficiency with advanced optimization strategies and practical tips.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-25T16:45:00Z",
    },
    {
      id: 5,
      title: "Demystifying CSS Grid Layout",
      description:
        "A beginner-friendly guide to understanding and implementing powerful two-dimensional layouts with CSS Grid.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-05T11:00:00Z",
    },
    {
      id: 6,
      title: "The Importance of Version Control with Git",
      description:
        "Explore why Git is indispensable for collaborative development and how to master its fundamental commands.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-11-01T08:30:00Z",
    },
    {
      id: 7,
      title: "State Management in Large-Scale Applications",
      description:
        "Compare different state management solutions and find the best fit for your complex, enterprise-level applications.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-10-28T13:00:00Z",
    },
    {
      id: 8,
      title: "Debugging JavaScript: Tips and Tricks",
      description:
        "Master the art of debugging JavaScript code efficiently with powerful browser developer tools and techniques.",
      coverImage:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      timestamp: "2023-10-22T15:00:00Z",
    },
  ];

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });

  return (
    <div className=" space-y-12 ">
      <div className="relative h-[23rem] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80")',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
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

      <div className="flex md:justify-end justify-center w-full ">
        <div className="flex items-center gap-3 ">
          <Select onValueChange={(value) => setSortOrder(value)}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-6xl px-5 mx-auto pb-7 gap-6 lg:gap-8 flex flex-col sm:grid lg:grid-cols-2 xl:grid-cols-3">
        {sortedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

interface BlogType {
  title: string;
  description: string;
  coverImage: string;
  timestamp: string;
}

interface BlogCardProps {
  blog: BlogType;
}

function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="group border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card w-full max-w-3xl mx-auto">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-primary text-background text-xs font-semibold px-3 py-1 shadow-sm">
          {formattedDate}
        </span>
      </div>

      <div className="px-4 py-6 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {blog.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {blog.description}
        </p>
      </div>
    </div>
  );
}