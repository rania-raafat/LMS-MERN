export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: string;
  order: number;
  isPublished: boolean;
  image?: File;
}

export interface ProjectsResponse {
  success: boolean;
  count: number;
  data: Project[];
  message?: string;
}

export interface ProjectResponse {
  success: boolean;
  message?: string;
  data?: Project;
}