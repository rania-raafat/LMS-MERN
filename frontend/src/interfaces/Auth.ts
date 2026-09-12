export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

/* =========================
   LOGIN
========================= */

export interface LoginSuccessResponse {
  success: true;
  message?: string;
  token: string;
  user: AuthUser;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
}

export type LoginResponse =
  | LoginSuccessResponse
  | LoginErrorResponse;

/* =========================
   REGISTER
========================= */

export interface RegisterSuccessResponse {
  success: true;
  message?: string;
  token: string;
  user: AuthUser;
}

export interface RegisterErrorResponse {
  success: false;
  message: string;
}

export type RegisterResponse =
  | RegisterSuccessResponse
  | RegisterErrorResponse;