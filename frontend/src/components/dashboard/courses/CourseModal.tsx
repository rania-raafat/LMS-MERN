import {
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  FiCheck,
  FiImage,
  FiLoader,
  FiUpload,
  FiX,
} from "react-icons/fi";

import type {
  Course,
  CourseLevel,
  CreateCourseData,
} from "../../../interfaces/Course";

interface CourseModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  course?: Course | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateCourseData,
  ) => Promise<void>;
}

interface FormState {
  title: string;
  category: string;
  description: string;
  duration: string;
  level: CourseLevel;
  featured: boolean;
  isPublished: boolean;
}

const defaultForm: FormState = {
  title: "",
  category: "",
  description: "",
  duration: "",
  level: "Beginner",
  featured: false,
  isPublished: true,
};

const getInitialForm = (
  mode: "create" | "edit",
  course?: Course | null,
): FormState => {
  if (mode === "edit" && course) {
    return {
      title: course.title,
      category: course.category,
      description: course.description,
      duration: course.duration,
      level: course.level,
      featured: course.featured,
      isPublished: course.isPublished,
    };
  }

  return defaultForm;
};

const CourseModal = ({
  isOpen,
  mode,
  course,
  isSubmitting,
  onClose,
  onSubmit,
}: CourseModalProps) => {
  const [form, setForm] = useState<FormState>(() =>
    getInitialForm(mode, course),
  );

  const [image, setImage] =
    useState<File | undefined>();

  const [imagePreview, setImagePreview] =
    useState<string>(() =>
      mode === "edit" && course
        ? course.imageUrl || ""
        : "",
    );

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  if (!isOpen) {
    return null;
  }

  const updateField = <
    K extends keyof FormState,
  >(
    field: K,
    value: FormState[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }));
    }
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setErrors((previous) => ({
        ...previous,
        title: "Please select a valid image file.",
      }));

      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        title: "Image size must be less than 5MB.",
      }));

      return;
    }

    setImage(selectedFile);

    setImagePreview(
      URL.createObjectURL(selectedFile),
    );
  };

  const validate = () => {
    const nextErrors: Partial<
      Record<keyof FormState, string>
    > = {};

    if (!form.title.trim()) {
      nextErrors.title =
        "Course title is required.";
    } else if (form.title.trim().length < 3) {
      nextErrors.title =
        "Course title must be at least 3 characters.";
    }

    if (!form.category.trim()) {
      nextErrors.category =
        "Category is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Description is required.";
    } else if (
      form.description.trim().length < 10
    ) {
      nextErrors.description =
        "Description must be at least 10 characters.";
    }

    if (!form.duration.trim()) {
      nextErrors.duration =
        "Duration is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      duration: form.duration.trim(),
      level: form.level,
      featured: form.featured,
      isPublished: form.isPublished,
      image,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          if (!isSubmitting) {
            onClose();
          }
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8D1CA] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-[#2C2825]">
              {mode === "create"
                ? "Create Course"
                : "Edit Course"}
            </h2>

            <p className="mt-1 text-xs text-[#8B8179]">
              {mode === "create"
                ? "Add a new course to your LMS."
                : "Update the course information."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-xl p-2 text-[#756D66] transition hover:bg-[#F7F5F2] hover:text-[#2C2825] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto"
        >
          <div className="space-y-5 p-5 sm:p-6">
            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2C2825]">
                Course Image
              </label>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#D8D1CA] bg-[#F7F5F2] sm:w-40">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiImage
                      size={28}
                      className="text-[#A29A93]"
                    />
                  )}
                </div>

                <label className="flex min-h-28 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#C9C1BA] bg-[#F7F5F2] px-4 text-center transition hover:border-[#2C2825] hover:bg-white">
                  <FiUpload
                    size={21}
                    className="mb-2 text-[#756D66]"
                  />

                  <span className="text-sm font-medium text-[#2C2825]">
                    Choose an image
                  </span>

                  <span className="mt-1 text-xs text-[#9B928A]">
                    JPG, PNG, WEBP · Max 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Title + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="course-title"
                  className="mb-2 block text-sm font-medium text-[#2C2825]"
                >
                  Title
                </label>

                <input
                  id="course-title"
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. React Fundamentals"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#2C2825] outline-none transition placeholder:text-[#A29A93] ${
                    errors.title
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8D1CA] focus:border-[#2C2825]"
                  }`}
                />

                {errors.title && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="course-category"
                  className="mb-2 block text-sm font-medium text-[#2C2825]"
                >
                  Category
                </label>

                <input
                  id="course-category"
                  type="text"
                  value={form.category}
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Web Development"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#2C2825] outline-none transition placeholder:text-[#A29A93] ${
                    errors.category
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8D1CA] focus:border-[#2C2825]"
                  }`}
                />

                {errors.category && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="course-description"
                className="mb-2 block text-sm font-medium text-[#2C2825]"
              >
                Description
              </label>

              <textarea
                id="course-description"
                rows={4}
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                placeholder="Describe what students will learn..."
                disabled={isSubmitting}
                className={`w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm leading-6 text-[#2C2825] outline-none transition placeholder:text-[#A29A93] ${
                  errors.description
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#D8D1CA] focus:border-[#2C2825]"
                }`}
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Duration + Level */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="course-duration"
                  className="mb-2 block text-sm font-medium text-[#2C2825]"
                >
                  Duration
                </label>

                <input
                  id="course-duration"
                  type="text"
                  value={form.duration}
                  onChange={(event) =>
                    updateField(
                      "duration",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 8 weeks"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#2C2825] outline-none transition placeholder:text-[#A29A93] ${
                    errors.duration
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8D1CA] focus:border-[#2C2825]"
                  }`}
                />

                {errors.duration && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.duration}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="course-level"
                  className="mb-2 block text-sm font-medium text-[#2C2825]"
                >
                  Level
                </label>

                <select
                  id="course-level"
                  value={form.level}
                  onChange={(event) =>
                    updateField(
                      "level",
                      event.target
                        .value as CourseLevel,
                    )
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-[#D8D1CA] bg-white px-3.5 py-2.5 text-sm text-[#2C2825] outline-none transition focus:border-[#2C2825]"
                >
                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#D8D1CA] bg-[#F7F5F2] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#2C2825]">
                    Featured
                  </p>

                  <p className="mt-0.5 text-xs text-[#8B8179]">
                    Highlight this course.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    updateField(
                      "featured",
                      event.target.checked,
                    )
                  }
                  disabled={isSubmitting}
                  className="h-4 w-4 accent-[#2C2825]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#D8D1CA] bg-[#F7F5F2] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#2C2825]">
                    Published
                  </p>

                  <p className="mt-0.5 text-xs text-[#8B8179]">
                    Make course visible publicly.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) =>
                    updateField(
                      "isPublished",
                      event.target.checked,
                    )
                  }
                  disabled={isSubmitting}
                  className="h-4 w-4 accent-[#2C2825]"
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#D8D1CA] bg-[#FCFBFA] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-[#D8D1CA] bg-white px-4 py-2.5 text-sm font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2C2825] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#403A35] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <FiLoader
                    size={17}
                    className="animate-spin"
                  />
                  {mode === "create"
                    ? "Creating..."
                    : "Saving..."}
                </>
              ) : (
                <>
                  <FiCheck size={17} />
                  {mode === "create"
                    ? "Create Course"
                    : "Save Changes"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
