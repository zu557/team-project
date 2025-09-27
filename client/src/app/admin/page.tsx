"use client"
import React, { useState } from 'react';
import ProjectManager from '../../components/Admin/ProjectManager'
import BlogManager from '../../components/Admin/BlogManager'



// The main AdminPage component with a modern UI and TypeScript.
export default function AdminPage() {

  const [active, setActive] = useState<string>("blogs");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full  p-4 bg-gray-100 rounded-3xl shadow-2xl transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 pb-4 pt-0 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Tab Navigation with modern styling */}
        <div className="mb-8 flex gap-2 rounded-xl bg-gray-200 p-2 shadow-inner">
          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium 
                        transition-all duration-300 transform ${active === "blogs" 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"}`}
            onClick={() => setActive("blogs")}
          >
            Manage Blogs
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium 
                        transition-all duration-300 transform ${active === "projects" 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"}`}
            onClick={() => setActive("projects")}
          >
            Manage Projects
          </button>
        </div>

        {/* Conditional Content */}
        {active === "blogs" ? <BlogManager /> : <ProjectManager />}
        
      </div>
    </div>
  );
}


