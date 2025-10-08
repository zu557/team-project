import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogType } from "@/types/blog";               // ✅ shared type
import { createBlog } from "@/api/createBlog";
import { updateBlog,BlogResult } from "@/api/updateBlog";
import {toast} from "sonner"

interface BlogFormProps {
  blog: BlogType | null;
  onSave: (saved: BlogResult) => void;   // parent refreshes on save
  onCancel: () => void;
}

const BlogForm: FC<BlogFormProps> = ({ blog, onSave, onCancel }) => {
  const [formData, setFormData] = useState<
    Omit<BlogType, "_id" | "coverImage"> & {
      _id?: string;
      coverImage?: string;
      coverImageFile?: File | null;
    }
  >(
    blog
      ? { ...blog, coverImageFile: null }
      : { title: "", description: "", content: "", author: "", categories: "", coverImageFile: null }
  );

  const [imagePreview, setImagePreview] = useState<string | null>(
    blog?.coverImage || null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, coverImageFile: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(formData.coverImage || null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { title, description, content, author, categories, coverImageFile, _id } = formData;
    if (!title || !description || !content || !author || !categories) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    if (!_id && !coverImageFile) {
      setMessage("Please select a cover image for a new blog post.");
      setLoading(false);
      return;
    }

 const multipartData  = new FormData();
    // Bundle all the text data into a single JSON object
    const postData: Omit<BlogType, '_id' | 'coverImage'> = {
      title,
      description,
      content,
      author,
      categories,
    };
     multipartData .append('post_data', JSON.stringify(postData));
    
    // Append the image file separately under the 'coverImage' key
    if (coverImageFile) {
      multipartData.append("image", coverImageFile);
    }
    try {
      const saved = _id
        ? await updateBlog(_id, multipartData )
        : await createBlog(multipartData );

      if (saved) {
        toast.success("Blog post saved successfully!")
        setMessage("Blog post saved successfully!");
        onSave(saved);
      } else {
        toast.error("Failed to save. Please try agian.")
        setMessage("Failed to save blog post. Please try again.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          {blog ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Blog Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="categories">Categories</Label>
            <Input id="categories" name="categories" value={formData.categories} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input id="coverImage" type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && (
              <div className="mt-4 border border-gray-300 rounded p-2 flex justify-center">
                <Image src={imagePreview} alt="Cover Preview" width={400} height={250} className="max-h-64 rounded-md object-contain" />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-6 py-2 border rounded-md text-sm font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-6 py-2 rounded-md text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {message && (
            <p className={`text-center mt-4 font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
