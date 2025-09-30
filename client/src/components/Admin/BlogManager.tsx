"use client";

import React, { useEffect, useState, useCallback, FC } from "react";
import { getBlogs } from "@/api/getBlogs";
import { deleteBlog } from "@/api/deleteBlog";
import PaginationBar from "@/components/Admin/PaginationBar";
import BlogForm from "@/components/BlogForm";
import { BlogType } from "@/types/blog";   
import { useSearchParams } from 'next/navigation';


interface BlogCardProps {
  blog: BlogType;
  onEdit: (b: BlogType) => void;
  onDelete: (id: string) => void;
}



const BlogCard: FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => (
  <div className="border shadow-md bg-white rounded-xl overflow-hidden">
    <div className="relative h-60 w-full">
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="object-cover w-full h-full"
        />
      )}
    </div>
    <div className="p-5 space-y-3">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-3">{blog.description}</p>
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <a href={`/blogs/${blog._id}`} className="text-blue-600 text-sm font-medium hover:underline">
          Read More
        </a>
        <div className="flex gap-2">
          <button onClick={() => onEdit(blog)} className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg 
               hover:bg-blue-700 hover:scale-105 transition-transform duration-200">
            Edit
          </button>
          <button onClick={() => onDelete(blog._id)} className="px-5 py-2 text-sm bg-red-500 text-white rounded-lg  hover:bg-red-600 hover:scale-105 transition-transform duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

const BlogManager: FC = () => {
    const params = useSearchParams();
  const sort = params.get('sort') || undefined;
  const [page, setPage] = useState<number>(1); 
  console.log("this is from Blog manager , page is and sort is :", page, sort)
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await getBlogs({ sort, page: page.toString()  });
    if (res) {
      if (!res.data || res.data.length === 0) {
        setError("No Blogs found.");
      } else {
        setBlogs(res.data);
        if (res.totalPage) setTotalPage(res.totalPage);
      }
    } else {
      setError("Failed to load blogs");
    }
    setLoading(false);
  }, [sort, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setEditingBlog(null);
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    setIsRefreshing(true);
    const success = await deleteBlog(id);
    if (success) await fetchData();
    setIsRefreshing(false);
  };

  if (loading || isRefreshing) return <p className="p-6">Loading blogs...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-6xl p-8 bg-white rounded-3xl shadow-2xl">
        <div className="flex justify-between mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold">Our Latest Insights</h1>
          <button
            onClick={() =>
              setEditingBlog({
                _id: "",
                title: "",
                description: "",
                content: "",
                author: "",
                categories: "",
              })
            }
            className="px-6 py-3 bg-green-600 text-white rounded-md"
          >
            Add New Blog
          </button>
        </div>

        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingBlog(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>

              <BlogForm
                blog={editingBlog}
                onSave={handleSave}
                onCancel={() => setEditingBlog(null)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onEdit={setEditingBlog}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <PaginationBar currentPage={Number(page) || 1} totalPage={totalPage} onChange={(p) => setPage(p)} />
      </div>
    </div>
  );
};

export default BlogManager;
