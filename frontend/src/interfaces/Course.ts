export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface Course {
  _id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: CourseLevel;
  imageUrl: string;
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  category: string;
  description: string;
  duration: string;
  level: CourseLevel;
  featured: boolean;
  isPublished: boolean;
  image?: File;
}

export interface CoursesResponse {
  success: boolean;
  count: number;
  data: Course[];
  message?: string;
}

export interface CourseResponse {
  success: boolean;
  message?: string;
  data?: Course;
}