import type {
  Project,
  CreateProjectData,
  ProjectsResponse,
  ProjectResponse,
} from "../interfaces/Project";

import api from "../interceptors/axiosInterceptor";

const API_URL = "/api/projects";

// =====================================================
// GET ALL PROJECTS
// GET /api/projects
// Public endpoint
// =====================================================

export const getProjects = async (): Promise<Project[]> => {
  const response =
    await api.get<ProjectsResponse>(API_URL);

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to fetch projects",
    );
  }

  return response.data.data;
};

// =====================================================
// GET PROJECT BY ID
// GET /api/projects/:id
// Public endpoint
// =====================================================

export const getProjectById = async (
  id: string,
): Promise<Project> => {
  const response =
    await api.get<ProjectResponse>(
      `${API_URL}/${id}`,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to fetch project",
    );
  }

  return response.data.data;
};

// =====================================================
// CREATE PROJECT
// POST /api/projects
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const createProject = async (
  data: CreateProjectData,
): Promise<Project> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append(
    "description",
    data.description,
  );
  formData.append(
    "technologies",
    JSON.stringify(data.technologies),
  );
  formData.append("type", data.type);
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
    await api.post<ProjectResponse>(
      API_URL,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to create project",
    );
  }

  return response.data.data;
};

// =====================================================
// UPDATE PROJECT
// PUT /api/projects/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const updateProject = async (
  id: string,
  data: CreateProjectData,
): Promise<Project> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append(
    "description",
    data.description,
  );
  formData.append(
    "technologies",
    JSON.stringify(data.technologies),
  );
  formData.append("type", data.type);
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
    await api.put<ProjectResponse>(
      `${API_URL}/${id}`,
      formData,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ||
        "Failed to update project",
    );
  }

  return response.data.data;
};

// =====================================================
// DELETE PROJECT
// DELETE /api/projects/:id
// Owner only
//
// JWT token is automatically added by the
// Axios request interceptor.
// =====================================================

export const deleteProject = async (
  id: string,
): Promise<void> => {
  const response =
    await api.delete<ProjectResponse>(
      `${API_URL}/${id}`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ||
        "Failed to delete project",
    );
  }
};