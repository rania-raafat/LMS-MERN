import { useEffect, useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiEdit2,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type {
  Course,
  CourseLevel,
  CreateCourseData,
} from "../../../interfaces/Course";

import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../../services/courseApi";

import CourseModal from "./CourseModal";

interface NotificationState {
  type: "success" | "error";
  message: string;
}

/*
 * ==================================================
 * DASHBOARD NOTIFICATION
 * ==================================================
 */

interface StoredNotification {
  id: string;
  title: string;
  message: string;
  type: "course" | "contact" | "system";
  createdAt: string;
  read: boolean;
}

const NOTIFICATIONS_KEY = "lms_notifications";

const DashboardCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [search, setSearch] = useState("");

  const [courseModalOpen, setCourseModalOpen] =
    useState(false);

  const [courseModalMode, setCourseModalMode] =
    useState<"create" | "edit">("create");

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [courseToDelete, setCourseToDelete] =
    useState<Course | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [notification, setNotification] =
    useState<NotificationState | null>(null);

  /*
   * ==================================================
   * TOAST NOTIFICATION
   * ==================================================
   */

  const showNotification = (
    type: NotificationState["type"],
    message: string,
  ) => {
    setNotification({
      type,
      message,
    });

    window.setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  /*
   * ==================================================
   * DASHBOARD NOTIFICATION
   * ==================================================
   */

  const addNotification = (
    title: string,
    message: string,
    type: StoredNotification["type"],
  ) => {
    const stored = localStorage.getItem(
      NOTIFICATIONS_KEY,
    );

    const notifications: StoredNotification[] =
      (() => {
        if (!stored) {
          return [];
        }

        try {
          const parsed: unknown =
            JSON.parse(stored);

          if (!Array.isArray(parsed)) {
            return [];
          }

          return parsed as StoredNotification[];
        } catch {
          return [];
        }
      })();

    const newNotification: StoredNotification = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      createdAt: new Date().toISOString(),
      read: false,
    };

    const updatedNotifications = [
      newNotification,
      ...notifications,
    ];

    localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify(updatedNotifications),
    );

    window.dispatchEvent(
      new Event("lms-notifications-updated"),
    );
  };

  /*
   * ==================================================
   * FETCH COURSES
   * ==================================================
   */

  const fetchCourses = async (
    showRefreshLoader = false,
  ) => {
    try {
      if (showRefreshLoader) {
        setIsRefreshing(true);
      }

      const data = await getCourses();

      setCourses(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load courses.";

      showNotification("error", message);
    } finally {
      setIsRefreshing(false);
    }
  };

  /*
   * ==================================================
   * INITIAL COURSE LOADING
   * ==================================================
   */

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        const data = await getCourses();

        if (!isMounted) {
          return;
        }

        setCourses(data);
        setIsLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Failed to load courses.";

        showNotification("error", message);

        setIsLoading(false);
      }
    };

    void loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * ==================================================
   * SEARCH
   * ==================================================
   */

  const filteredCourses = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return courses;
    }

    return courses.filter((course) => {
      return (
        course.title
          .toLowerCase()
          .includes(query) ||
        course.category
          .toLowerCase()
          .includes(query) ||
        course.level
          .toLowerCase()
          .includes(query) ||
        course.description
          .toLowerCase()
          .includes(query)
      );
    });
  }, [courses, search]);

  /*
   * ==================================================
   * COURSE MODAL
   * ==================================================
   */

  const openCreateModal = () => {
    setCourseModalMode("create");
    setSelectedCourse(null);
    setCourseModalOpen(true);
  };

  const openEditModal = (
    course: Course,
  ) => {
    setCourseModalMode("edit");
    setSelectedCourse(course);
    setCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    if (isSubmitting) {
      return;
    }

    setCourseModalOpen(false);
    setSelectedCourse(null);
  };

  /*
   * ==================================================
   * CREATE / UPDATE COURSE
   * ==================================================
   */

  const handleCourseSubmit = async (
    data: CreateCourseData,
  ) => {
    try {
      setIsSubmitting(true);

      /*
       * EDIT
       */

      if (
        courseModalMode === "edit" &&
        selectedCourse
      ) {
        const updatedCourse =
          await updateCourse(
            selectedCourse._id,
            data,
          );

        setCourses(
          (currentCourses) =>
            currentCourses.map(
              (course) =>
                course._id ===
                updatedCourse._id
                  ? updatedCourse
                  : course,
            ),
        );

        addNotification(
          "Course Edited",
          `"${updatedCourse.title}" was successfully updated.`,
          "course",
        );

        showNotification(
          "success",
          "Course updated successfully.",
        );
      } else {
        /*
         * CREATE
         */

        const newCourse =
          await createCourse(data);

        setCourses(
          (currentCourses) => [
            newCourse,
            ...currentCourses,
          ],
        );

        addNotification(
          "New Course Added",
          `"${newCourse.title}" was successfully added to your courses.`,
          "course",
        );

        showNotification(
          "success",
          "Course created successfully.",
        );
      }

      setCourseModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      showNotification(
        "error",
        message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ==================================================
   * DELETE COURSE
   * ==================================================
   */

  const handleDeleteCourse = async () => {
    if (!courseToDelete) {
      return;
    }

    const courseTitle =
      courseToDelete.title;

    const courseId =
      courseToDelete._id;

    try {
      setIsDeleting(true);

      await deleteCourse(courseId);

      setCourses(
        (currentCourses) =>
          currentCourses.filter(
            (course) =>
              course._id !== courseId,
          ),
      );

      addNotification(
        "Course Deleted",
        `"${courseTitle}" was removed from your courses.`,
        "course",
      );

      showNotification(
        "success",
        "Course deleted successfully.",
      );

      setCourseToDelete(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete course.";

      showNotification(
        "error",
        message,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /*
   * ==================================================
   * LEVEL COLORS
   * ==================================================
   */

  const getLevelClasses = (
    level: CourseLevel,
  ) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-100";

      default:
        return "bg-[#F7F5F2] text-[#625B55] border-[#D8D1CA]";
    }
  };

  /*
   * ==================================================
   * UI
   * ==================================================
   */

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ==================================================
          TOAST
      ================================================== */}

      {notification && (
        <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
              notification.type === "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                notification.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {notification.type ===
              "success" ? (
                <FiCheck size={18} />
              ) : (
                <FiX size={18} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#2C2825]">
                {notification.type ===
                "success"
                  ? "Success"
                  : "Something went wrong"}
              </p>

              <p className="mt-0.5 text-xs leading-5 text-[#756D66]">
                {notification.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotification(null)
              }
              className="rounded-lg p-1.5 text-[#9B928A] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
              aria-label="Close notification"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-[#8B8179]">
            Management
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#2C2825] sm:text-3xl">
            Courses
          </h2>

          <p className="mt-2 text-sm text-[#756D66]">
            Create and manage your LMS
            courses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              void fetchCourses(true)
            }
            disabled={isRefreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D8D1CA] bg-white px-3.5 text-sm font-semibold text-[#625B55] transition hover:border-[#BEB5AC] hover:bg-[#F7F5F2] hover:text-[#2C2825] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              size={17}
              className={
                isRefreshing
                  ? "animate-spin"
                  : ""
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2C2825] px-4 text-sm font-semibold text-white transition hover:bg-[#403A35]"
          >
            <FiPlus size={18} />
            Add Course
          </button>
        </div>
      </div>

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="mb-6 rounded-2xl border border-[#D8D1CA] bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B928A]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search courses..."
              className="w-full rounded-xl border border-[#D8D1CA] bg-[#F7F5F2] py-2.5 pl-10 pr-4 text-sm text-[#2C2825] outline-none transition placeholder:text-[#9B928A] focus:border-[#2C2825] focus:bg-white"
            />
          </div>

          <p className="text-xs text-[#8B8179]">
            Showing{" "}
            <span className="font-semibold text-[#625B55]">
              {filteredCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#625B55]">
              {courses.length}
            </span>{" "}
            courses
          </p>
        </div>
      </div>

      {/* ==================================================
          COURSES
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white">
        <div className="flex items-center justify-between border-b border-[#D8D1CA] px-5 py-4">
          <div>
            <h3 className="font-semibold text-[#2C2825]">
              All Courses
            </h3>

            <p className="mt-0.5 text-xs text-[#9B928A]">
              Manage your course catalog
            </p>
          </div>

          {courses.length > 0 && (
            <span className="rounded-full bg-[#F7F5F2] px-3 py-1 text-xs font-medium text-[#756D66]">
              {courses.length} total
            </span>
          )}
        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {isLoading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-[#EEE9E4] p-4"
              >
                <div className="flex gap-4">
                  <div className="h-16 w-24 shrink-0 rounded-lg bg-[#EEE9E4]" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/3 rounded bg-[#EEE9E4]" />

                    <div className="h-3 w-2/3 rounded bg-[#EEE9E4]" />

                    <div className="h-3 w-1/4 rounded bg-[#EEE9E4]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          /* ==================================================
              EMPTY
          ================================================== */

          <div className="flex min-h-72 items-center justify-center px-5 py-12">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                <FiBookOpen size={22} />
              </div>

              <h4 className="text-sm font-semibold text-[#2C2825]">
                No courses available
              </h4>

              <p className="mt-1.5 text-xs leading-5 text-[#9B928A]">
                You have not created any
                courses yet. Add your first
                course to start building your
                LMS catalog.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2C2825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#403A35]"
              >
                <FiPlus size={17} />
                Create Course
              </button>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* ==================================================
              NO SEARCH RESULTS
          ================================================== */

          <div className="flex min-h-64 items-center justify-center px-5 py-12">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                <FiSearch size={20} />
              </div>

              <p className="text-sm font-medium text-[#625B55]">
                No matching courses
              </p>

              <p className="mt-1 text-xs text-[#9B928A]">
                Try a different search term.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 text-xs font-semibold text-[#2C2825] underline underline-offset-4"
              >
                Clear search
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ==================================================
                DESKTOP
                4 COURSES PER SWIPER PAGE
            ================================================== */}

            <div className="hidden md:block">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="courses-swiper !pb-12"
              >
                {Array.from({
                  length: Math.ceil(
                    filteredCourses.length /
                      4,
                  ),
                }).map(
                  (_, pageIndex) => {
                    const pageCourses =
                      filteredCourses.slice(
                        pageIndex * 4,
                        pageIndex * 4 + 4,
                      );

                    return (
                      <SwiperSlide
                        key={`courses-page-${pageIndex}`}
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[900px]">
                            <thead>
                              <tr className="border-b border-[#EEE9E4] bg-[#FCFBFA]">
                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Course
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Category
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Level
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Status
                                </th>

                                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B928A]">
                                  Actions
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {pageCourses.map(
                                (course) => (
                                  <tr
                                    key={
                                      course._id
                                    }
                                    className="border-b border-[#EEE9E4] last:border-b-0 transition hover:bg-[#FCFBFA]"
                                  >
                                    <td className="px-5 py-4">
                                      <div className="flex items-center gap-3">
                                        {course.imageUrl ? (
                                          <img
                                            src={
                                              course.imageUrl
                                            }
                                            alt={
                                              course.title
                                            }
                                            className="h-14 w-20 shrink-0 rounded-lg border border-[#D8D1CA] object-cover"
                                          />
                                        ) : (
                                          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-[#D8D1CA] bg-[#F7F5F2] text-[#9B928A]">
                                            <FiBookOpen
                                              size={
                                                19
                                              }
                                            />
                                          </div>
                                        )}

                                        <div className="min-w-0">
                                          <p className="max-w-[280px] truncate text-sm font-semibold text-[#2C2825]">
                                            {
                                              course.title
                                            }
                                          </p>

                                          <p className="mt-1 max-w-[300px] truncate text-xs text-[#9B928A]">
                                            {
                                              course.duration
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-4">
                                      <span className="text-sm text-[#625B55]">
                                        {
                                          course.category
                                        }
                                      </span>
                                    </td>

                                    <td className="px-5 py-4">
                                      <span
                                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getLevelClasses(
                                          course.level,
                                        )}`}
                                      >
                                        {
                                          course.level
                                        }
                                      </span>
                                    </td>

                                    <td className="px-5 py-4">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span
                                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                            course.isPublished
                                              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                              : "border-[#D8D1CA] bg-[#F7F5F2] text-[#756D66]"
                                          }`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                              course.isPublished
                                                ? "bg-emerald-500"
                                                : "bg-[#9B928A]"
                                            }`}
                                          />

                                          {course.isPublished
                                            ? "Published"
                                            : "Draft"}
                                        </span>

                                        {course.featured && (
                                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                                            <FiStar
                                              size={
                                                11
                                              }
                                              fill="currentColor"
                                            />

                                            Featured
                                          </span>
                                        )}
                                      </div>
                                    </td>

                                    <td className="px-5 py-4">
                                      <div className="flex justify-end gap-2">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditModal(
                                              course,
                                            )
                                          }
                                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1CA] text-[#625B55] transition hover:border-[#2C2825] hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                                          aria-label={`Edit ${course.title}`}
                                        >
                                          <FiEdit2
                                            size={
                                              15
                                            }
                                          />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            setCourseToDelete(
                                              course,
                                            )
                                          }
                                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                          aria-label={`Delete ${course.title}`}
                                        >
                                          <FiTrash2
                                            size={
                                              15
                                            }
                                          />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </SwiperSlide>
                    );
                  },
                )}
              </Swiper>
            </div>

            {/* ==================================================
                MOBILE
                4 COURSES PER SWIPER PAGE
            ================================================== */}

            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className="courses-mobile-swiper !pb-12"
              >
                {Array.from({
                  length: Math.ceil(
                    filteredCourses.length /
                      4,
                  ),
                }).map(
                  (_, pageIndex) => {
                    const pageCourses =
                      filteredCourses.slice(
                        pageIndex * 4,
                        pageIndex * 4 + 4,
                      );

                    return (
                      <SwiperSlide
                        key={`courses-mobile-page-${pageIndex}`}
                      >
                        <div className="divide-y divide-[#EEE9E4]">
                          {pageCourses.map(
                            (course) => (
                              <div
                                key={
                                  course._id
                                }
                                className="p-4"
                              >
                                <div className="flex gap-3">
                                  {course.imageUrl ? (
                                    <img
                                      src={
                                        course.imageUrl
                                      }
                                      alt={
                                        course.title
                                      }
                                      className="h-16 w-24 shrink-0 rounded-lg border border-[#D8D1CA] object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-[#D8D1CA] bg-[#F7F5F2] text-[#9B928A]">
                                      <FiBookOpen
                                        size={
                                          19
                                        }
                                      />
                                    </div>
                                  )}

                                  <div className="min-w-0 flex-1">
                                    <h4 className="truncate text-sm font-semibold text-[#2C2825]">
                                      {
                                        course.title
                                      }
                                    </h4>

                                    <p className="mt-1 truncate text-xs text-[#8B8179]">
                                      {
                                        course.category
                                      }
                                    </p>

                                    <p className="mt-1 text-xs text-[#9B928A]">
                                      {
                                        course.duration
                                      }
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                  <span
                                    className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getLevelClasses(
                                      course.level,
                                    )}`}
                                  >
                                    {
                                      course.level
                                    }
                                  </span>

                                  <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                      course.isPublished
                                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                        : "border-[#D8D1CA] bg-[#F7F5F2] text-[#756D66]"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        course.isPublished
                                          ? "bg-emerald-500"
                                          : "bg-[#9B928A]"
                                      }`}
                                    />

                                    {course.isPublished
                                      ? "Published"
                                      : "Draft"}
                                  </span>

                                  {course.featured && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                                      <FiStar
                                        size={
                                          11
                                        }
                                        fill="currentColor"
                                      />

                                      Featured
                                    </span>
                                  )}
                                </div>

                                <div className="mt-4 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openEditModal(
                                        course,
                                      )
                                    }
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D8D1CA] px-3 py-2 text-xs font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] hover:text-[#2C2825]"
                                  >
                                    <FiEdit2
                                      size={
                                        14
                                      }
                                    />
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCourseToDelete(
                                        course,
                                      )
                                    }
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600"
                                  >
                                    <FiTrash2
                                      size={
                                        14
                                      }
                                    />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  },
                )}
              </Swiper>
            </div>
          </>
        )}
      </div>

      {/* ==================================================
          COURSE MODAL
      ================================================== */}

      <CourseModal
        key={
          courseModalMode === "edit"
            ? selectedCourse?._id ??
              "edit"
            : "create"
        }
        isOpen={courseModalOpen}
        mode={courseModalMode}
        course={selectedCourse}
        isSubmitting={isSubmitting}
        onClose={closeCourseModal}
        onSubmit={handleCourseSubmit}
      />

      {/* ==================================================
          DELETE CONFIRMATION
      ================================================== */}

      {courseToDelete && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl border border-[#D8D1CA] bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiTrash2 size={20} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#2C2825]">
              Delete course?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#756D66]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#2C2825]">
                “{courseToDelete.title}”
              </span>
              ? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setCourseToDelete(null)
                }
                disabled={isDeleting}
                className="rounded-xl border border-[#D8D1CA] px-4 py-2.5 text-sm font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleDeleteCourse()
                }
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {isDeleting
                  ? "Deleting..."
                  : "Delete Course"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          SWIPER PAGINATION STYLES
      ================================================== */}

      <style>{`
        .courses-swiper .swiper-pagination,
        .courses-mobile-swiper .swiper-pagination {
          bottom: 0;
        }

        .courses-swiper .swiper-pagination-bullet,
        .courses-mobile-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #D8D1CA;
          opacity: 1;
          transition: all 0.2s ease;
        }

        .courses-swiper .swiper-pagination-bullet-active,
        .courses-mobile-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 999px;
          background: #2C2825;
        }
      `}</style>
    </div>
  );
};

export default DashboardCourses;