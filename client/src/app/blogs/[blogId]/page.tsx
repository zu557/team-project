import { getBlog, BlogType } from "@/api/getBlog";
// import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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



// Make sure your Tinos font is correctly imported and configured in next.config.js
// import { Tinos } from 'next/font/google';
// const tinos = Tinos({ subsets: ['latin'], weight: ['400', '700'] });

// Assume blog type and data are available as props
// const { blog } = props;



return (
  <div className="relative bg-gray-950 min-h-screen font-sans text-gray-100 antialiased">
    {/* Fixed Background Image */}
    {blog.coverImage && (
      <img
        src={blog.coverImage}
        alt={blog.title}
        layout="fill"
        objectfit="cover"
        className="fixed inset-0 z-0 brightness-[.25] blur-sm transition-all duration-700"
      />
    )}
    
    {/* Main Content Container */}
    <div className="relative z-10">
      {/* Blog Header with Title and Description */}
      <header className="py-24 px-6 md:py-32 flex flex-col items-center justify-center text-center backdrop-blur-sm bg-gray-950/20">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            {blog.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            {blog.description}
          </p>
        </div>
      </header>
      
      {/* Back Button */}
      <div className="relative z-20 flex justify-center py-4 -mt-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-white bg-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 font-semibold transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blogs
        </Link>
      </div>

      {/* Blog Content Section */}
      <main className="relative z-10 py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-12">
          <div
            className="prose prose-xl prose-invert max-w-none space-y-6 leading-relaxed text-gray-200"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </main>
    </div>
  </div>
);
}
