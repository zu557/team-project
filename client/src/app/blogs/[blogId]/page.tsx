import { getBlog, BlogType } from "@/api/getBlog";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
interface BlogProps {
  params: Promise<{ blogId: string }>;
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { blogId } = await params;
  const blog: BlogType | null = await getBlog(blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogsDetail({ params }: BlogProps) {
  const { blogId } = await params;
  const blog: BlogType | null = await getBlog(blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg text-muted-foreground">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="relative h-[35vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover brightness-75 scale-105 hover:scale-110 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl px-6 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold  ">
            {blog.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl">{blog.description}</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 mt-4 text-white bg-primary py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-xl space-y-12">
        <div
          className="prose prose-lg prose-invert max-w-none space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
