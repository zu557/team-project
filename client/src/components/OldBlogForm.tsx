import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


// Assume these components are from your shadcn/ui setup
// The rest of the styling is handled by Tailwind CSS classes directly in the JSX.

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file change to set the file and create a preview URL
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCoverImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!title || !description || !author ||!content  ||  !categories || !coverImageFile) {
      setMessage('Please fill in all the fields and select a cover image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    // Bundle all the text data into a single JSON object
    const postData = {
      title,
      description,
      content,
      author,
      categories,
    };
    formData.append('post_data', JSON.stringify(postData));
    
    // Append the image file separately under the 'coverImage' key
    formData.append('image', coverImageFile);

    // --- ADDED FOR DEBUGGING ---
   
    console.log("----------------------------");
    // --- END DEBUGGING CODE ---

    try {
      const response = await axios.post('http://localhost:5000/api/v1/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      setMessage('Blog post submitted successfully!');
      
      // Reset form fields on success
      setTitle('');
      setDescription('');
      setAuthor('');
      setContent('');
      setCategories('');
      setCoverImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add a New Blog Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog Title */}
            <div>
              <Label htmlFor="blog-title">Blog Title</Label>
              <Input 
                type="text" 
                id="blog-title" 
                placeholder="Enter the blog title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {/* Blog Author */}
            <div>
              <Label htmlFor="blog-author">Blog Author</Label>
              <Input 
                type="text" 
                id="blog-author" 
                placeholder="Author name" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          
          {/* Blog Description */}
          <div className="grid w-full gap-3">
            <Label htmlFor="blog-description">Blog Description</Label>
            <Textarea 
              placeholder="Type your blog content here." 
              id="blog-description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
           {/* Blog Content */}
          <div className="grid w-full gap-3">
            <Label htmlFor="blog-content">Blog Content</Label>
            <Textarea 
              placeholder="Type your blog content here." 
              id="blog-content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {/* Blog Categories */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="blog-categories">Blog Categories</Label>
            <Input 
              type="text" 
              id="blog-categories" 
              placeholder="Put your catagories ..." 
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          
          {/* Cover Image with Preview */}
          <div className="grid w-full gap-3">
            <Label htmlFor="cover-image">Cover Image</Label>
            <Input 
              id="cover-image" 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mt-4 border border-gray-300 rounded-lg p-2 flex justify-center">
                

                <Image 
                  src={imagePreview} 
                  alt="Cover Preview" 
                  width={400} // Set an appropriate width
                  height={250} // Set an appropriate height
                  className="max-h-64 rounded-md object-contain" 
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Blog'}
            </button>
          </div>
          
          {message && (
            <p className={`text-center mt-4 font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
