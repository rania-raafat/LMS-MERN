import type {
  LearningPath,
  CreateLearningPathData,
  LearningPathsResponse,
  LearningPathResponse,
} from "../interfaces/LearningPath";

import api from "../interceptors/axiosInterceptor";

const API_URL = "/api/learning-paths";

// =====================================================
// GET ALL LEARNING PATHS
// GET /api/learning-paths
// Public endpoint
// =====================================================

export const getLearningPaths =
  async (): Promise<LearningPath[]> => {
    const response =
      await api.get<LearningPathsResponse>(
        API_URL,
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Failed to fetch learning paths",
      );
    }

    return response.data.data;
  };

// =====================================================
// GET LEARNING PATH BY ID
// GET /api/learning-paths/:id
// Public endpoint
// =====================================================

export const getLearningPathById = async (
  id: string,
): Promise<LearningPath> => {
  const response =
    await api.get<LearningPathResponse>(
      `${API_URL}/${id}`,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to fetch learning path",
    );
  }

  return response.data.data;
};

// =====================================================
// CREATE LEARNING PATH
// POST /api/learning-paths
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const createLearningPath = async (
  data: CreateLearningPathData,
): Promise<LearningPath> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("level", data.level);
  formData.append(
    "description",
    data.description,
  );
  formData.append(
    "skills",
    JSON.stringify(data.skills),
  );
  formData.append(
    "coursesCount",
    String(data.coursesCount),
  );
  formData.append(
    "order",
    String(data.order),
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.post<LearningPathResponse>(
      API_URL,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to create learning path",
    );
  }

  return response.data.data;
};

// =====================================================
// UPDATE LEARNING PATH
// PUT /api/learning-paths/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const updateLearningPath = async (
  id: string,
  data: CreateLearningPathData,
): Promise<LearningPath> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("level", data.level);
  formData.append(
    "description",
    data.description,
  );
  formData.append(
    "skills",
    JSON.stringify(data.skills),
  );
  formData.append(
    "coursesCount",
    String(data.coursesCount),
  );
  formData.append(
    "order",
    String(data.order),
  );
  formData.append(
    "isPublished",
    String(data.isPublished),
  );

  if (data.image) {
    formData.append("image", data.image);
  }

  const response =
    await api.put<LearningPathResponse>(
      `${API_URL}/${id}`,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to update learning path",
    );
  }

  return response.data.data;
};

// =====================================================
// DELETE LEARNING PATH
// DELETE /api/learning-paths/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const deleteLearningPath = async (
  id: string,
): Promise<void> => {
  const response =
    await api.delete<LearningPathResponse>(
      `${API_URL}/${id}`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to delete learning path",
    );
  }
};