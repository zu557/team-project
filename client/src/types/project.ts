export interface ProjectType {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  githubLink?: string;
  deploymentLink: string;
}