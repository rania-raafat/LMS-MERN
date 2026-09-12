export type LearningPathLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface LearningPath {
  _id: string;
  title: string;
  level: LearningPathLevel;
  description: string;
  skills: string[];
  coursesCount: number;
  imageUrl: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLearningPathData {
  title: string;
  level: LearningPathLevel;
  description: string;
  skills: string[];
  coursesCount: number;
  order: number;
  isPublished: boolean;
  image?: File;
}

export interface LearningPathsResponse {
  success: boolean;
  count: number;
  data: LearningPath[];
  message?: string;
}

export interface LearningPathResponse {
  success: boolean;
  message?: string;
  data?: LearningPath;
}