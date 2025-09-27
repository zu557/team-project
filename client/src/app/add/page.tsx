"use client";
import { useState } from 'react';


import ProjectForm from "@/components/ProjectForm"
import BlogForm from "@/components/BlogForm"

export default function AddPage() {
  type FormType = 'blog' | 'project';
  const [activeForm, setActiveForm] = useState<FormType>('blog');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Navigation buttons */}
      <div className="flex justify-center space-x-4 mb-10">
        <button
          onClick={() => setActiveForm('blog')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            activeForm === 'blog'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Add Blog Post
        </button>
        <button
          onClick={() => setActiveForm('project')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            activeForm === 'project'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Add Project
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        {activeForm === 'blog' ? <BlogForm /> : <ProjectForm />}
      </div>
    </div>
  );
}
