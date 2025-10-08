import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectType } from "@/types/project";
import { createProject } from "@/api/createProject";
import { updateProject ,ProjectResult} from "@/api/updateProject";
import {toast} from "sonner"

interface ProjectFormProps {
  project: ProjectType | null;
  onSave: (saved: ProjectResult) => void;
  onCancel: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<
    Omit<ProjectType, "_id" | "imageUrl"> & {
      _id?: string;
      imageUrl?: string;
      imageFile?: File | null;
    }
  >(
    project
      ? {
          _id: project._id,
          title: project.title,
          description: project.description,
          category: project.category || "",
          githubLink: project.githubLink || "",
          deploymentLink: project.deploymentLink || "",
          imageUrl: project.imageUrl,
          imageFile: null,
        }
      : {
          title: "",
          description: "",
          category: "",
          githubLink: "",
          deploymentLink: "",
          imageFile: null,
        }
  );

  const [preview, setPreview] = useState<string | null>(
    project?.imageUrl || null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(formData.imageUrl || null);
    }
  };
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const { _id, title, description, category, githubLink, deploymentLink, imageFile } = formData;

  if (!title || !description || !deploymentLink) {
    setMessage("Please fill in all required fields.");
    setLoading(false);
    return;
  }

  const data = new FormData();
  const postData: Omit<ProjectType, "_id" | "imageFile"> = {
    title,
    description,
    category,
    githubLink,
    deploymentLink,
  };
  data.append("post_data", JSON.stringify(postData));

  // ✅ use correct field name
  if (imageFile) data.append("image", imageFile);

  try {
    const saved = _id
      ? await updateProject(_id, data)
      : await createProject(data);

    if (saved) {
      toast.success("Project saved successfully")
      setMessage("Project saved successfully!");
      onSave(saved);
    } else {
      toast.error("Failed to save project")
      setMessage("Failed to save project.");
    }
  } catch (err) {
    console.error(err);
    setMessage("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />

          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} />

          <Label htmlFor="githubLink">GitHub Link</Label>
          <Input id="githubLink" name="githubLink" value={formData.githubLink} onChange={handleChange} />

          <Label htmlFor="deploymentLink">Deployment Link</Label>
          <Input id="deploymentLink" name="deploymentLink" value={formData.deploymentLink} onChange={handleChange} />

          <Label htmlFor="imageUrl">Project Image</Label>
          <Input id="imageUrl" type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div className="mt-4 border rounded p-2 flex justify-center">
              <Image src={preview} alt="Project Preview" width={400} height={250} className="object-contain rounded" />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="px-6 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
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

export default ProjectForm;
