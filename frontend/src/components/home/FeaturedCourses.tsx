import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Clock3,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useReveal } from "../../hooks/useReveal";
import { getCourses } from "../../services/courseApi";
import type { Course } from "../../interfaces/Course";

const FeaturedCourses = () => {
  const { ref: sectionRef, visible } =
    useReveal<HTMLElement>();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH COURSES FROM DATABASE
  ========================================================= */
  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCourses();

        if (!isMounted) return;

        /*
         * getCourses() returns Course[] directly.
         *
         * Therefore:
         * setCourses(data)
         *
         * NOT:
         * setCourses(data.data)
         */
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to load courses.");
        }

        setCourses([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#F7F5F2]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          SECTION SEPARATOR
      ====================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-0
          w-full
          max-w-7xl
          -translate-x-1/2
          px-5
          sm:px-8
          lg:px-8
        "
      >
        <div className="h-px w-full bg-[#D8D1CA]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-8
          lg:px-8
        "
      >
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}
        <div
          className="
            flex
            flex-col
            gap-6
            text-left
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* =================================================
              HEADING
          ================================================== */}
          <div
            className={`
              max-w-2xl
              transition-all
              duration-1000
              ease-out
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#D8D1CA]
                bg-white/60
                px-4
                py-2
                text-xs
                font-medium
                text-[#77716B]
                sm:text-sm
              "
            >
              Featured Courses
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-[var(--main-color)]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Learn. Build.
              <br className="hidden sm:block" />
              Grow Your Skills.
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                leading-7
                text-[#77716B]
                sm:text-lg
              "
            >
              Explore practical courses designed to help
              you build real-world skills and grow your
              career.
            </p>
          </div>

          {/* =================================================
              VIEW ALL COURSES
          ================================================== */}
          <Link
            to="/courses"
            className={`
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[#D8D1CA]
              bg-white/50
              px-5
              py-3
              text-sm
              font-medium
              text-[var(--main-color)]
              transition-all
              duration-1000
              ease-out
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-md
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{
              transitionDelay: "150ms",
            }}
          >
            <span>View All Courses</span>

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* ===================================================
            COURSES AREA
        ==================================================== */}
        <div
          className={`
            relative
            mt-12
            transition-all
            duration-1000
            ease-out
            sm:mt-14
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
          style={{
            transitionDelay: "300ms",
          }}
        >
          {/* =================================================
              LOADING
          ================================================== */}
          {loading && (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-[#D8D1CA]
                    bg-white
                  "
                >
                  {/* Image skeleton */}
                  <div
                    className="
                      h-[220px]
                      w-full
                      animate-pulse
                      bg-[#E8E2DC]
                    "
                  />

                  <div className="space-y-4 p-5 sm:p-6">
                    {/* Title */}
                    <div
                      className="
                        h-6
                        w-3/4
                        animate-pulse
                        rounded
                        bg-[#E8E2DC]
                      "
                    />

                    {/* Description */}
                    <div
                      className="
                        h-4
                        w-full
                        animate-pulse
                        rounded
                        bg-[#E8E2DC]
                      "
                    />

                    <div
                      className="
                        h-4
                        w-2/3
                        animate-pulse
                        rounded
                        bg-[#E8E2DC]
                      "
                    />

                    {/* Divider */}
                    <div className="h-px w-full bg-[#E8E2DC]" />

                    {/* Info */}
                    <div
                      className="
                        h-4
                        w-1/2
                        animate-pulse
                        rounded
                        bg-[#E8E2DC]
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================== */}
          {!loading && error && (
            <div
              className="
                rounded-[26px]
                border
                border-red-200
                bg-white
                px-6
                py-12
                text-center
              "
            >
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================== */}
          {!loading &&
            !error &&
            courses.length === 0 && (
              <div
                className="
                  rounded-[26px]
                  border
                  border-[#D8D1CA]
                  bg-white
                  px-6
                  py-12
                  text-center
                "
              >
                <p className="text-sm text-[#77716B]">
                  No courses available.
                </p>
              </div>
            )}

          {/* =================================================
              SWIPER
          ================================================== */}
          {!loading &&
            !error &&
            courses.length > 0 && (
              <>
                <Swiper
                  dir="ltr"
                  modules={[
                    Navigation,
                    Pagination,
                    Autoplay,
                  ]}
                  spaceBetween={20}
                  slidesPerView={1}
                  speed={700}
                  loop={courses.length > 1}
                  grabCursor={true}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                    el: ".courses-pagination",
                  }}
                  navigation={{
                    nextEl: ".courses-next",
                    prevEl: ".courses-prev",
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 22,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                  }}
                  className="!overflow-hidden"
                >
                  {/* =================================================
                      DATABASE COURSES
                  ================================================== */}
                  {courses.map((course) => (
                    <SwiperSlide
                      key={course._id}
                      className="!h-auto"
                    >
                      <article
                        className="
                          group
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-[26px]
                          border
                          border-[#D8D1CA]
                          bg-white
                          text-left
                          transition-all
                          duration-500
                          hover:shadow-xl
                          hover:shadow-black/5
                        "
                      >
                        {/* =========================================
                            CLOUDINARY IMAGE
                        ========================================== */}
                        <div
                          className="
                            relative
                            h-[220px]
                            overflow-hidden
                            bg-[#E8E2DC]
                          "
                        >
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            loading="lazy"
                            decoding="async"
                            className="
                              h-[220px]
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                            onError={(event) => {
                              const image =
                                event.currentTarget;

                              image.style.display = "none";
                            }}
                          />

                          {/* Image Overlay */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/25
                              via-transparent
                              to-transparent
                            "
                          />

                          {/* Category */}
                          <span
                            className="
                              absolute
                              left-4
                              top-4
                              rounded-full
                              bg-white/90
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-[var(--main-color)]
                              backdrop-blur-sm
                            "
                          >
                            {course.category}
                          </span>
                        </div>

                        {/* =========================================
                            COURSE CONTENT
                        ========================================== */}
                        <div
                          className="
                            flex
                            flex-1
                            flex-col
                            p-5
                            sm:p-6
                          "
                        >
                          {/* Title */}
                          <h3
                            className="
                              text-xl
                              font-semibold
                              leading-snug
                              text-[var(--main-color)]
                            "
                          >
                            {course.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="
                              mt-3
                              line-clamp-2
                              text-sm
                              leading-6
                              text-[#77716B]
                            "
                          >
                            {course.description}
                          </p>

                          {/* =====================================
                              COURSE INFORMATION
                          ====================================== */}
                          <div
                            className="
                              mt-5
                              flex
                              items-center
                              gap-5
                              border-t
                              border-[#E8E2DC]
                              pt-4
                            "
                          >
                            {/* Duration */}
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-[#77716B]
                              "
                            >
                              <Clock3
                                size={15}
                                strokeWidth={1.8}
                              />

                              <span>
                                {course.duration}
                              </span>
                            </div>

                            {/* Level */}
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-[#77716B]
                              "
                            >
                              <BarChart3
                                size={15}
                                strokeWidth={1.8}
                              />

                              <span>
                                {course.level}
                              </span>
                            </div>
                          </div>

                          {/* =====================================
                              VIEW COURSE
                          ====================================== */}
                          <Link
                            to={`/courses/${course._id}`}
                            className="
                              group/link
                              mt-6
                              flex
                              items-center
                              justify-between
                              border-t
                              border-[#E8E2DC]
                              pt-4
                              text-sm
                              font-medium
                              text-[var(--main-color)]
                            "
                          >
                            <span>
                              View Course
                            </span>

                            <ArrowRight
                              size={18}
                              strokeWidth={1.8}
                              className="
                                transition-transform
                                duration-300
                                group-hover/link:translate-x-1
                              "
                            />
                          </Link>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* =================================================
                    SWIPER CONTROLS
                ================================================== */}
                <div
                  className={`
                    mt-7
                    flex
                    items-center
                    justify-between
                    transition-all
                    duration-700
                    ease-out
                    ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: "500ms",
                  }}
                >
                  {/* Pagination */}
                  <div
                    className="
                      courses-pagination
                      !static
                      !w-auto
                    "
                  />

                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    {/* Previous */}
                    <button
                      type="button"
                      className="
                        courses-prev
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#D8D1CA]
                        bg-white/60
                        text-[var(--main-color)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:bg-white
                        hover:shadow-md
                      "
                      aria-label="Previous courses"
                    >
                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        className="rotate-180"
                      />
                    </button>

                    {/* Next */}
                    <button
                      type="button"
                      className="
                        courses-next
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--main-color)]
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-lg
                      "
                      aria-label="Next courses"
                    >
                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;