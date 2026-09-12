export interface Instructor {
  _id: string;
  name: string;
  specialty: string;
  role: string;
  experience: string;
  linkedin: string;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstructorData {
  name: string;
  specialty: string;
  role: string;
  experience: string;
  linkedin: string;
  isPublished: boolean;
  image?: File;
}

export interface InstructorsResponse {
  success: boolean;
  count: number;
  data: Instructor[];
  message?: string;
}

export interface InstructorResponse {
  success: boolean;
  message?: string;
  data?: Instructor;
}