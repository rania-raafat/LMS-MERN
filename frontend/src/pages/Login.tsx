import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import logo from "../assets/images/lms-logo.webp";

import {
  loginOwner,
  registerUser,
} from "../services/authApi";

type AuthMode = "login" | "register";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const MESSAGE_DURATION = 3500;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const initialMode: AuthMode =
    searchParams.get("mode") === "register"
      ? "register"
      : "login";

  const [mode, setMode] =
    useState<AuthMode>(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================
     TEMPORARY MESSAGES
  ========================= */

  useEffect(() => {
    if (!error && !success) {
      return;
    }

    const timer = window.setTimeout(() => {
      setError("");
      setSuccess("");
    }, MESSAGE_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [error, success]);

  /* =========================
     HELPERS
  ========================= */

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const clearFieldError = (
    field: keyof FormErrors,
  ) => {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const showError = (message: string) => {
    setSuccess("");
    setError(message);
  };

  const showSuccess = (message: string) => {
    setError("");
    setSuccess(message);
  };

  /* =========================
     EMAIL VALIDATION
  ========================= */

  const validateEmail =
    (): string | undefined => {
      const normalizedEmail =
        email.trim();

      if (!normalizedEmail) {
        return "Email address is required.";
      }

      if (
        !emailRegex.test(
          normalizedEmail,
        )
      ) {
        return "Please enter a valid email address.";
      }

      if (
        normalizedEmail.length > 254
      ) {
        return "Email address is too long.";
      }

      return undefined;
    };

  /* =========================
     LOGIN VALIDATION
  ========================= */

  const validateLogin =
    (): FormErrors => {
      const newErrors: FormErrors = {};

      const emailError =
        validateEmail();

      if (emailError) {
        newErrors.email = emailError;
      }

      if (!password) {
        newErrors.password =
          "Password is required.";
      }

      return newErrors;
    };

  /* =========================
     REGISTER VALIDATION
  ========================= */

  const validateRegister =
    (): FormErrors => {
      const newErrors: FormErrors = {};

      const trimmedName =
        name.trim();

      /* -------------------------
         Name
      ------------------------- */

      if (!trimmedName) {
        newErrors.name =
          "Full name is required.";
      } else if (
        trimmedName.length < 2
      ) {
        newErrors.name =
          "Full name must contain at least 2 characters.";
      } else if (
        trimmedName.length > 50
      ) {
        newErrors.name =
          "Full name must not exceed 50 characters.";
      }

      /* -------------------------
         Email
      ------------------------- */

      const emailError =
        validateEmail();

      if (emailError) {
        newErrors.email = emailError;
      }

      /* -------------------------
         Password
      ------------------------- */

      if (!password) {
        newErrors.password =
          "Password is required.";
      } else if (
        password.length < 6
      ) {
        newErrors.password =
          "Password must contain at least 6 characters.";
      } else if (
        password.length > 128
      ) {
        newErrors.password =
          "Password must not exceed 128 characters.";
      } else if (
        !/[A-Za-z]/.test(password)
      ) {
        newErrors.password =
          "Password must contain at least one letter.";
      } else if (
        !/[0-9]/.test(password)
      ) {
        newErrors.password =
          "Password must contain at least one number.";
      }

      /* -------------------------
         Confirm Password
      ------------------------- */

      if (!confirmPassword) {
        newErrors.confirmPassword =
          "Please confirm your password.";
      } else if (
        password !== confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match.";
      }

      return newErrors;
    };

  /* =========================
     CHANGE AUTH MODE
  ========================= */

  const changeMode = (
    nextMode: AuthMode,
  ) => {
    if (loading) {
      return;
    }

    setMode(nextMode);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setErrors({});

    clearMessages();

    navigate(
      nextMode === "register"
        ? "/login?mode=register"
        : "/login",
      {
        replace: true,
      },
    );
  };

  /* =========================
     LOGIN ERROR HANDLING
  ========================= */

  const getLoginErrorMessage = (
    error: unknown,
  ): string => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unable to sign in. Please try again.";
  };

  /* =========================
     REGISTER ERROR HANDLING
  ========================= */

  const getRegisterErrorMessage = (
    error: unknown,
  ): string => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unable to create your account. Please try again.";
  };

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = async () => {
    const validationErrors =
      validateLogin();

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      return;
    }

    try {
      const response =
        await loginOwner({
          email: email.trim(),
          password,
        });

      const role =
        response.user.role.toLowerCase();

      /* -------------------------
         Owner access check
      ------------------------- */

      if (role !== "owner") {
        throw new Error(
          role === "user"
            ? "Your account does not have access to the owner dashboard."
            : "Your account does not have permission to access this dashboard.",
        );
      }

      /* -------------------------
         Store authentication
      ------------------------- */

      localStorage.setItem(
        "lms_token",
        response.token,
      );

      localStorage.setItem(
        "lms_user",
        JSON.stringify(
          response.user,
        ),
      );

      /* -------------------------
         Success message
      ------------------------- */

      showSuccess(
        "Signed in successfully. Redirecting...",
      );

      window.setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 500);
    } catch (error) {
      /*
       * Backend response:
       *
       * {
       *   success: false,
       *   message: "Invalid email or password"
       * }
       *
       * authApi converts the backend
       * message into an Error, so it
       * will appear directly here.
       */

      showError(
        getLoginErrorMessage(error),
      );
    }
  };

  /* =========================
     REGISTER
  ========================= */

  const handleRegister = async () => {
    const validationErrors =
      validateRegister();

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      return;
    }

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      /* -------------------------
         Clear form
      ------------------------- */

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setErrors({});

      /* -------------------------
         Switch to login
      ------------------------- */

      setMode("login");

      navigate("/login", {
        replace: true,
      });

      showSuccess(
        "Account created successfully. You can now sign in.",
      );
    } catch (error) {
      /*
       * Examples from backend:
       *
       * "An account with this email already exists"
       * "Password must contain at least one letter and one number"
       * etc.
       */

      showError(
        getRegisterErrorMessage(error),
      );
    }
  };

  /* =========================
     FORM SUBMIT
  ========================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    clearMessages();

    setLoading(true);

    try {
      if (mode === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INPUT STYLES
  ========================= */

  const inputClass = (
    field:
      | "name"
      | "email"
      | "password"
      | "confirmPassword",
  ) => `
    w-full
    rounded-xl
    border
    ${
      errors[field]
        ? "border-red-400 bg-red-50/30"
        : "border-[#d8d1ca]"
    }
    bg-white
    px-4
    py-3.5
    text-sm
    text-[var(--main-color)]
    outline-none
    transition-all
    duration-300
    placeholder:text-[#aaa39c]
    hover:border-[#bdb5ad]
    focus:border-[var(--primary-color)]
    focus:ring-4
    focus:ring-[var(--primary-color)]/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  return (
    <main className="m-0 min-h-screen w-full bg-[var(--background)] p-0">
      <div className="min-h-screen w-full bg-white">
        <div className="grid min-h-screen w-full lg:grid-cols-[0.9fr_1.1fr]">
          {/* =========================
              LEFT BRAND PANEL
          ========================= */}

          <section className="relative hidden min-h-screen overflow-hidden bg-[var(--main-color)] text-white lg:flex">
            {/* Decorative circles */}

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-white/10" />

            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

            <div className="relative z-10 flex min-h-screen w-full flex-col justify-between p-10 xl:p-14">
              {/* Desktop Logo */}

              <Link
                to="/"
                className="group flex w-fit items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <img
                    src={logo}
                    alt="LMS Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <span className="text-2xl font-bold tracking-tight">
                  LMS
                </span>
              </Link>

              {/* Main Content */}

              <div className="max-w-md">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70">
                  <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]" />

                  Learn. Build. Grow.
                </div>

                <h1 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
                  Your learning
                  <br />
                  journey starts
                  <br />
                  here.
                </h1>

                <p className="mt-7 max-w-md text-base leading-7 text-white/55">
                  Access practical courses,
                  structured learning paths,
                  and real-world projects
                  designed to help you grow.
                </p>
              </div>

              {/* Bottom Features */}

              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  Practical Learning
                </span>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span>
                  Real Projects
                </span>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span>
                  Career Growth
                </span>
              </div>
            </div>
          </section>

          {/* =========================
              RIGHT FORM SECTION
          ========================= */}

          <section
            className="
              min-h-screen
              w-full
              overflow-y-auto
              bg-white
              px-4
              py-6
              sm:px-6
              sm:py-8
              md:px-10
              md:py-10
              lg:flex
              lg:items-center
              lg:justify-center
              lg:px-12
              lg:py-12
              xl:px-20
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-md
                py-2
                sm:py-4
                lg:py-0
              "
            >
              {/* =========================
                  MOBILE HEADER
              ========================= */}

              <div className="mb-8 lg:hidden">
                <Link
                  to="/"
                  className="flex w-fit items-center gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white">
                    <img
                      src={logo}
                      alt="LMS Logo"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <span className="block text-2xl font-bold tracking-tight text-[var(--main-color)]">
                      LMS
                    </span>

                    <span className="block text-xs text-[#9a928a]">
                      Learn. Build. Grow.
                    </span>
                  </div>
                </Link>
              </div>

              {/* =========================
                  HEADING
              ========================= */}

              <div className="mb-7">
                <p className="mb-2 text-sm font-medium text-[#8a827a]">
                  {mode === "login"
                    ? "Welcome back"
                    : "Get started"}
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-[var(--main-color)] sm:text-[34px]">
                  {mode === "login"
                    ? "Sign in to LMS"
                    : "Create your account"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#77716b]">
                  {mode === "login"
                    ? "Enter your details to continue."
                    : "Create your account and start learning."}
                </p>
              </div>

              {/* =========================
                  LOGIN / REGISTER TABS
              ========================= */}

              <div className="mb-7 grid grid-cols-2 rounded-xl border border-[#d8d1ca] bg-[#f7f5f2] p-1">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    changeMode("login")
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      mode === "login"
                        ? "bg-white text-[var(--main-color)] shadow-sm"
                        : "text-[#8a827a] hover:text-[var(--main-color)]"
                    }
                  `}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    changeMode("register")
                  }
                  className={`
                    rounded-lg
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      mode === "register"
                        ? "bg-white text-[var(--main-color)] shadow-sm"
                        : "text-[#8a827a] hover:text-[var(--main-color)]"
                    }
                  `}
                >
                  Create Account
                </button>
              </div>

              {/* =========================
                  GLOBAL MESSAGE
              ========================= */}

              {(error || success) && (
                <div
                  role={
                    error
                      ? "alert"
                      : "status"
                  }
                  aria-live="polite"
                  className={`
                    mb-6
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    leading-5
                    animate-[fadeIn_0.25s_ease-out]
                    ${
                      error
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-green-200 bg-green-50 text-green-700"
                    }
                  `}
                >
                  <span
                    className={`
                      mt-1.5
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      ${
                        error
                          ? "bg-red-500"
                          : "bg-green-500"
                      }
                    `}
                  />

                  <span className="break-words">
                    {error || success}
                  </span>
                </div>
              )}

              {/* =========================
                  FORM
              ========================= */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="
                  space-y-5
                  pb-2
                  sm:space-y-6
                "
              >
                {/* Full Name */}

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[var(--main-color)]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) => {
                        setName(
                          event.target.value,
                        );

                        clearFieldError(
                          "name",
                        );
                      }}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      maxLength={50}
                      disabled={loading}
                      className={inputClass(
                        "name",
                      )}
                    />

                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[var(--main-color)]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(
                        event.target.value,
                      );

                      clearFieldError(
                        "email",
                      );
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    disabled={loading}
                    className={inputClass(
                      "email",
                    )}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[var(--main-color)]"
                    >
                      Password
                    </label>

                    {mode ===
                      "register" && (
                      <span className="text-[11px] text-[#9a928a]">
                        Min. 6 characters
                      </span>
                    )}
                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      const value =
                        event.target
                          .value;

                      setPassword(value);

                      clearFieldError(
                        "password",
                      );

                      if (
                        confirmPassword &&
                        value ===
                          confirmPassword
                      ) {
                        clearFieldError(
                          "confirmPassword",
                        );
                      }
                    }}
                    placeholder="Enter your password"
                    autoComplete={
                      mode === "login"
                        ? "current-password"
                        : "new-password"
                    }
                    maxLength={128}
                    disabled={loading}
                    className={inputClass(
                      "password",
                    )}
                  />

                  {errors.password && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.password}
                    </p>
                  )}

                  {mode ===
                    "register" &&
                    !errors.password && (
                      <p className="mt-1.5 text-xs text-[#9a928a]">
                        Use at least one
                        letter and one
                        number.
                      </p>
                    )}
                </div>

                {/* Confirm Password */}

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-[var(--main-color)]"
                    >
                      Confirm Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      value={
                        confirmPassword
                      }
                      onChange={(event) => {
                        setConfirmPassword(
                          event.target
                            .value,
                        );

                        clearFieldError(
                          "confirmPassword",
                        );
                      }}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      maxLength={128}
                      disabled={loading}
                      className={inputClass(
                        "confirmPassword",
                      )}
                    />

                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-xs font-medium text-red-600">
                        {
                          errors.confirmPassword
                        }
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[var(--main-color)]
                    bg-[var(--main-color)]
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    hover:shadow-black/10
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {mode === "login"
                        ? "Signing In..."
                        : "Creating Account..."}
                    </span>
                  ) : mode === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* =========================
                  BOTTOM LINKS
              ========================= */}

              <div className="mt-7 pb-6 text-center sm:pb-4">
                <p className="text-sm text-[#77716b]">
                  {mode === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      changeMode(
                        mode === "login"
                          ? "register"
                          : "login",
                      )
                    }
                    className="font-semibold text-[var(--main-color)] transition-colors hover:text-[var(--primary-color)] hover:underline disabled:opacity-50"
                  >
                    {mode === "login"
                      ? "Create one"
                      : "Sign in"}
                  </button>
                </p>

                <Link
                  to="/"
                  className="mt-4 inline-block text-xs text-[#9a928a] transition-colors hover:text-[var(--main-color)]"
                >
                  ← Back to website
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;