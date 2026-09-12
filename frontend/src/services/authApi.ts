import axios from "axios";

import type {
  AuthUser,
  LoginData,
  LoginResponse,
  LoginSuccessResponse,
  RegisterData,
  RegisterResponse,
  RegisterSuccessResponse,
} from "../interfaces/Auth";

import api from "../interceptors/axiosInterceptor";

/* =========================
   LOGIN
========================= */

export const loginOwner = async (
  data: LoginData,
): Promise<LoginSuccessResponse> => {
  try {
    const response =
      await api.post<LoginResponse>(
        "/api/auth/login",
        data,
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Invalid email or password.",
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage =
        error.response?.data?.message;

      if (backendMessage) {
        throw new Error(
          backendMessage,
          { cause: error },
        );
      }

      if (error.response?.status === 401) {
        throw new Error(
          "Invalid email or password.",
          { cause: error },
        );
      }

      throw new Error(
        "Request failed. Please try again.",
        { cause: error },
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Invalid email or password.",
      { cause: error },
    );
  }
};

/* =========================
   REGISTER
========================= */

export const registerUser = async (
  data: RegisterData,
): Promise<RegisterSuccessResponse> => {
  try {
    const response =
      await api.post<RegisterResponse>(
        "/api/auth/register",
        data,
      );

    if (!response.data.success) {
      throw new Error(
        response.data.message ||
          "Unable to create your account.",
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage =
        error.response?.data?.message;

      if (backendMessage) {
        throw new Error(
          backendMessage,
          { cause: error },
        );
      }

      throw new Error(
        "Unable to create your account. Please try again.",
        { cause: error },
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Unable to create your account. Please try again.",
      { cause: error },
    );
  }
};

/* =========================
   LOGOUT
========================= */

export const logoutOwner = (): void => {
  localStorage.removeItem("lms_token");
  localStorage.removeItem("lms_user");
};

/* =========================
   AUTH TOKEN
========================= */

export const getAuthToken = (): string | null => {
  return localStorage.getItem("lms_token");
};

/* =========================
   STORED USER
========================= */

export const getStoredUser =
  (): AuthUser | null => {
    const user =
      localStorage.getItem("lms_user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as AuthUser;
    } catch {
      return null;
    }
  };

/* =========================
   AUTH STATUS
========================= */

export const isAuthenticated =
  (): boolean => {
    return Boolean(getAuthToken());
  };