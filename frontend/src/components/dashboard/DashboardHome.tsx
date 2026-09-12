import { useEffect, useState } from "react";

import {
  FiBookOpen,
  FiMail,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type { Contact } from "../../interfaces/Contact";
import type { Course } from "../../interfaces/Course";

import { getContacts } from "../../services/contactApi";
import { getCourses } from "../../services/courseApi";

const DashboardHome = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        const [coursesData, contactsData] =
          await Promise.all([
            getCourses(),
            getContacts(),
          ]);

        if (cancelled) {
          return;
        }

        setCourses(coursesData);
        setContacts(contactsData);
        setError(null);
        setIsLoading(false);
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        console.error(
          "Dashboard data fetch error:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data.",
        );

        setIsLoading(false);
      }
    };

    void loadInitialData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [coursesData, contactsData] =
        await Promise.all([
          getCourses(),
          getContacts(),
        ]);

      setCourses(coursesData);
      setContacts(contactsData);
    } catch (error: unknown) {
      console.error(
        "Dashboard refresh error:",
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to refresh dashboard data.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const recentCourses = courses.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  const stats = [
    {
      title: "Total Courses",
      value: courses.length.toString(),
      description: "Courses available",
      icon: <FiBookOpen size={20} />,
    },
    {
      title: "Total Students",
      value: "0",
      description: "Registered students",
      icon: <FiUsers size={20} />,
    },
    {
      title: "Messages",
      value: contacts.length.toString(),
      description: "Contact messages",
      icon: <FiMail size={20} />,
    },
    {
      title: "Growth",
      value: "0%",
      description: "This month",
      icon: <FiTrendingUp size={20} />,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* =====================================================
          WELCOME
      ====================================================== */}
      <section className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-[#8B8179]">
              Overview
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-[#2C2825] sm:text-3xl">
              Welcome back 👋
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D66]">
              Here's what's happening with your LMS
              today.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#D8D1CA] bg-white px-4 py-2.5 text-sm font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              size={16}
              className={
                isLoading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </section>

      {/* =====================================================
          ERROR
      ====================================================== */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#D8D1CA] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F5F2] text-[#2C2825]">
                {stat.icon}
              </div>
            </div>

            <p className="text-sm font-medium text-[#756D66]">
              {stat.title}
            </p>

            {isLoading ? (
              <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-[#F0ECE8]" />
            ) : (
              <p className="mt-1 text-2xl font-bold text-[#2C2825]">
                {stat.value}
              </p>
            )}

            <p className="mt-1 text-xs text-[#9B928A]">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      {/* =====================================================
          RECENT CONTENT
      ====================================================== */}
      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* ===================================================
            RECENT COURSES
        ==================================================== */}
        <div className="overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white">
          <div className="flex items-center justify-between border-b border-[#D8D1CA] px-5 py-4">
            <div>
              <h3 className="font-semibold text-[#2C2825]">
                Recent Courses
              </h3>

              <p className="mt-1 text-xs text-[#8B8179]">
                Your latest courses
              </p>
            </div>

            <span className="rounded-full bg-[#F7F5F2] px-3 py-1 text-xs font-semibold text-[#625B55]">
              {courses.length}
            </span>
          </div>

          <div className="p-4 sm:p-5">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-[#E8E3DE] p-3"
                  >
                    <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-[#F0ECE8]" />

                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-[#F0ECE8]" />

                      <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-[#F0ECE8]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCourses.length === 0 ? (
              <div className="flex min-h-48 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                    <FiBookOpen size={20} />
                  </div>

                  <p className="text-sm font-medium text-[#625B55]">
                    No courses yet
                  </p>

                  <p className="mt-1 text-xs text-[#9B928A]">
                    Your recent courses will appear
                    here.
                  </p>
                </div>
              </div>
            ) : (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={12}
                slidesPerView={1}
                className="dashboard-swiper !pb-10"
              >
                {recentCourses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E8E3DE] p-3 transition hover:bg-[#FCFBFA]">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F7F5F2]">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#8B8179]">
                            <FiBookOpen size={18} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#2C2825]">
                          {course.title}
                        </p>

                        <div className="mt-1 flex min-w-0 items-center gap-2 text-xs text-[#8B8179]">
                          <span className="truncate">
                            {course.category}
                          </span>

                          <span className="shrink-0">
                            •
                          </span>

                          <span className="shrink-0">
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline-flex ${
                          course.isPublished
                            ? "bg-green-50 text-green-700"
                            : "bg-[#F7F5F2] text-[#8B8179]"
                        }`}
                      >
                        {course.isPublished
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>

        {/* ===================================================
            RECENT MESSAGES
        ==================================================== */}
        <div className="overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white">
          <div className="flex items-center justify-between border-b border-[#D8D1CA] px-5 py-4">
            <div>
              <h3 className="font-semibold text-[#2C2825]">
                Recent Messages
              </h3>

              <p className="mt-1 text-xs text-[#8B8179]">
                Latest contact messages
              </p>
            </div>

            <span className="rounded-full bg-[#F7F5F2] px-3 py-1 text-xs font-semibold text-[#625B55]">
              {contacts.length}
            </span>
          </div>

          <div className="p-4 sm:p-5">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#E8E3DE] p-3"
                  >
                    <div className="h-4 w-1/2 animate-pulse rounded bg-[#F0ECE8]" />

                    <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-[#F0ECE8]" />

                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#F0ECE8]" />

                    <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-[#F0ECE8]" />
                  </div>
                ))}
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="flex min-h-48 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F2] text-[#8B8179]">
                    <FiMail size={20} />
                  </div>

                  <p className="text-sm font-medium text-[#625B55]">
                    No messages yet
                  </p>

                  <p className="mt-1 text-xs text-[#9B928A]">
                    New contact messages will appear
                    here.
                  </p>
                </div>
              </div>
            ) : (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={12}
                slidesPerView={1}
                className="dashboard-swiper !pb-10"
              >
                {recentContacts.map((contact) => (
                  <SwiperSlide key={contact._id}>
                    <div className="min-w-0 rounded-xl border border-[#E8E3DE] p-3 transition hover:bg-[#FCFBFA]">
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#2C2825]">
                            {contact.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-[#8B8179]">
                            {contact.email}
                          </p>
                        </div>

                        <span className="shrink-0 text-[11px] text-[#9B928A]">
                          {new Date(
                            contact.createdAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="mt-3 truncate text-xs font-medium text-[#625B55]">
                        {contact.subject}
                      </p>

                      <p className="mt-1 line-clamp-3 break-words text-xs leading-5 text-[#8B8179]">
                        {contact.message}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .dashboard-swiper .swiper-pagination {
          bottom: 0;
        }

        .dashboard-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #D8D1CA;
          opacity: 1;
          transition: all 0.2s ease;
        }

        .dashboard-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 999px;
          background: #2C2825;
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;