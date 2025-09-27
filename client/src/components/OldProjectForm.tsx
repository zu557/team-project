import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Assume these components are from your shadcn/ui setup
// The rest of the styling is handled by Tailwind CSS classes directly in the JSX.

export default function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deploymentLink, setDeploymentLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file change to set the file and create a preview URL
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
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

    if (!title || !description || !category || !imageFile) {
      setMessage('Please fill in all the required fields and select a picture.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    // The backend expects a single JSON object under the 'post_data' field
    const postData = {
      title,
      description,
      category,
      githubLink, 
      deploymentLink
    };

    formData.append('post_data', JSON.stringify(postData));
    // The backend expects the file to be under the 'image' field
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      setMessage('Project submitted successfully!');
      
      // Reset form fields on success
      setTitle('');
      setDescription('');
      setCategory('');
      setGithubLink('');
      setDeploymentLink('');
      setImageFile(null);
      setImagePreview(null);

    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add a New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div>
              <Label htmlFor="project-title">Project Title</Label>
              <Input 
                type="text" 
                id="project-title" 
                placeholder="Enter the project title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {/* Project Category */}
            <div>
              <Label htmlFor="project-category">Project Category</Label>
              <Input 
                type="text" 
                id="project-category" 
                placeholder="e.g., Web Development" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
          
          {/* Project Description */}
          <div className="grid w-full gap-3">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea 
              placeholder="Provide a detailed description of your project." 
              id="project-description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub Link */}
            <div>
              <Label htmlFor="github-link">GitHub Link</Label>
              <Input 
                type="url" 
                id="github-link" 
                placeholder="https://github.com/..." 
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </div>
            
            {/* Deployment Link */}
            <div>
              <Label htmlFor="deployment-link">Deployment Link</Label>
              <Input 
                type="url" 
                id="deployment-link" 
                placeholder="https://your-app.com/..." 
                value={deploymentLink}
                onChange={(e) => setDeploymentLink(e.target.value)}
              />
            </div>
          </div>
          
          {/* Project Picture with Preview */}
          <div className="grid w-full gap-3">
            <Label htmlFor="project-picture">Project Picture</Label>
            <Input 
              id="project-picture" 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mt-4 border border-gray-300 rounded-lg p-2 flex justify-center">
                
              <Image 
                src={imagePreview} 
                alt="Project Preview" 
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
              {loading ? 'Submitting...' : 'Submit Project'}
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
