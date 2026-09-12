import type {
  Course,
  CreateCourseData,
  CoursesResponse,
  CourseResponse,
} from "../interfaces/Course";

import api from "../interceptors/axiosInterceptor";

const API_URL = "/api/courses";

// =====================================================
// GET ALL COURSES
// GET /api/courses
// Public endpoint
// =====================================================

export const getCourses = async (): Promise<Course[]> => {
  const response =
    await api.get<CoursesResponse>(API_URL);

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to fetch courses",
    );
  }

  return response.data.data;
};

// =====================================================
// GET COURSE BY ID
// GET /api/courses/:id
// Public endpoint
// =====================================================

export const getCourseById = async (
  id: string,
): Promise<Course> => {
  const response =
    await api.get<CourseResponse>(
      `${API_URL}/${id}`,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to fetch course",
    );
  }

  return response.data.data;
};

// =====================================================
// CREATE COURSE
// POST /api/courses
// Owner only
//
// Authentication token is automatically added
// by the Axios interceptor.
// =====================================================

export const createCourse = async (
  data: CreateCourseData,
): Promise<Course> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append(
    "description",
    data.description,
  );
  formData.append("duration", data.duration);
  formData.append("level", data.level);
  formData.append(
    "featured",
    String(data.featured),
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.post<CourseResponse>(
      API_URL,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to create course",
    );
  }

  return response.data.data;
};

// =====================================================
// UPDATE COURSE
// PUT /api/courses/:id
// Owner only
//
// Authentication token is automatically added
// by the Axios interceptor.
// =====================================================

export const updateCourse = async (
  id: string,
  data: CreateCourseData,
): Promise<Course> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append(
    "description",
    data.description,
  );
  formData.append("duration", data.duration);
  formData.append("level", data.level);
  formData.append(
    "featured",
    String(data.featured),
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.put<CourseResponse>(
      `${API_URL}/${id}`,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to update course",
    );
  }

  return response.data.data;
};

// =====================================================
// DELETE COURSE
// DELETE /api/courses/:id
// Owner only
//
// Authentication token is automatically added
// by the Axios interceptor.
// =====================================================

export const deleteCourse = async (
  id: string,
): Promise<void> => {
  const response =
    await api.delete<CourseResponse>(
      `${API_URL}/${id}`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to delete course",
    );
  }
};