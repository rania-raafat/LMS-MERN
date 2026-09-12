import type {
  Instructor,
  CreateInstructorData,
  InstructorsResponse,
  InstructorResponse,
} from "../interfaces/Instructor";

import api from "../interceptors/axiosInterceptor";

const API_URL = "/api/instructors";

// =====================================================
// GET ALL INSTRUCTORS
// GET /api/instructors
// Public endpoint
// =====================================================

export const getInstructors =
  async (): Promise<Instructor[]> => {
    const response =
      await api.get<InstructorsResponse>(
        API_URL,
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to fetch instructors",
      );
    }

    return response.data.data;
  };

// =====================================================
// GET INSTRUCTOR BY ID
// GET /api/instructors/:id
// Public endpoint
// =====================================================

export const getInstructorById = async (
  id: string,
): Promise<Instructor> => {
  const response =
    await api.get<InstructorResponse>(
      `${API_URL}/${id}`,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to fetch instructor",
    );
  }

  return response.data.data;
};

// =====================================================
// CREATE INSTRUCTOR
// POST /api/instructors
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const createInstructor = async (
  data: CreateInstructorData,
): Promise<Instructor> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append(
    "specialty",
    data.specialty,
  );
  formData.append("role", data.role);
  formData.append(
    "experience",
    data.experience,
  );
  formData.append(
    "linkedin",
    data.linkedin,
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.post<InstructorResponse>(
      API_URL,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to create instructor",
    );
  }

  return response.data.data;
};

// =====================================================
// UPDATE INSTRUCTOR
// PUT /api/instructors/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const updateInstructor = async (
  id: string,
  data: CreateInstructorData,
): Promise<Instructor> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append(
    "specialty",
    data.specialty,
  );
  formData.append("role", data.role);
  formData.append(
    "experience",
    data.experience,
  );
  formData.append(
    "linkedin",
    data.linkedin,
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.put<InstructorResponse>(
      `${API_URL}/${id}`,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to update instructor",
    );
  }

  return response.data.data;
};

// =====================================================
// DELETE INSTRUCTOR
// DELETE /api/instructors/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const deleteInstructor = async (
  id: string,
): Promise<void> => {
  const response =
    await api.delete<InstructorResponse>(
      `${API_URL}/${id}`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to delete instructor",
    );
  }
};