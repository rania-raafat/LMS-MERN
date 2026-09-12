import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("lms_token");

    if (token) {
      config.headers.Token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status =
      error.response?.status;

    const requestUrl =
      error.config?.url || "";

    /*
     * Do NOT redirect when the 401
     * comes from the login request.
     *
     * Login needs to receive the
     * backend error so Login.tsx
     * can display:
     *
     * "Invalid email or password"
     */
    const isLoginRequest =
      requestUrl.includes(
        "/api/auth/login",
      );

    if (
      status === 401 &&
      !isLoginRequest
    ) {
      const token =
        localStorage.getItem(
          "lms_token",
        );

      if (token) {
        localStorage.removeItem(
          "lms_token",
        );

        localStorage.removeItem(
          "lms_user",
        );

        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;