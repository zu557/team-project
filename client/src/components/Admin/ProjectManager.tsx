'use client';

import React, { useEffect, useState, useCallback, FC } from "react";
import { getProjects } from "@/api/getProjects";
import { deleteProject } from "@/api/deleteProject";
import ProjectForm from "@/components/ProjectForm";
import PaginationBar from "@/components/PaginationBar";
import {ProjectType } from "@/types/project"
import { useSearchParams } from 'next/navigation';
  

interface CardProps {
  project: ProjectType;
  onEdit: (p: ProjectType) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: FC<CardProps> = ({ project, onEdit, onDelete }) => (
  <div className="border shadow-md bg-white rounded-xl overflow-hidden">
    {project.imageUrl && (
      <div className="relative h-60 w-full">
        <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
      </div>
    )}
    <div className="p-5 space-y-3">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="flex gap-2">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm underline">
              GitHub
            </a>
          )}
          {project.deploymentLink && (
            <a href={project.deploymentLink} target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm underline">
              Live
            </a>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(project)}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg 
                      hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
          >
          Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="px-5 py-2 text-sm bg-red-500 text-white rounded-lg 
                    hover:bg-red-600 hover:scale-105 transition-transform duration-200"
        >
          Delete
        </button>
            </div>
      </div>
    </div>
  </div>
);


const ProjectManager: FC = () => {
  const params = useSearchParams();
  const category = params.get('category') || undefined;
  const page = params.get('page') || undefined;

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await getProjects({ category, page });
    if (res) {
      if (!res.data || res.data.length === 0) {
        setError("No projects found.");
      } else {
        setProjects(res.data);
        if (res.totalPage) setTotalPage(res.totalPage);
      }
    } else {
      setError("Failed to load projects.");
    }
    setLoading(false);
  }, [category, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setEditingProject(null);
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    setIsRefreshing(true);
    const success = await deleteProject(id);
    if (success) {
      await fetchData();
    }
    setIsRefreshing(false);
  };

  if (loading || isRefreshing) return <p className="p-6">Loading projects...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-6xl p-8 bg-white rounded-3xl shadow-2xl">
        <div className="flex justify-between mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold">Projects Showcase</h1>
          <button
            onClick={() =>
              setEditingProject({
                _id: "",
                title: "",
                description: "",
                category: "",
                imageUrl: "",
                githubLink: "",
                deploymentLink: "",
              })
            }
            className="px-6 py-3 bg-green-600 text-white rounded-md"
          >
            Add New Project
          </button>
        </div>

        {/* ---------- Modal ---------- */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setEditingProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ✕
              </button>

              <ProjectForm
                project={editingProject}
                onSave={handleSave}
                onCancel={() => setEditingProject(null)}
              />
            </div>
          </div>
        )}
        {/* -------------------------- */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onEdit={setEditingProject}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <PaginationBar currentPage={Number(page) || 1} totalPage={totalPage} />
      </div>
    </div>
  );
};

export default ProjectManager;
