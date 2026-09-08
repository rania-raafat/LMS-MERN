import { Link } from "react-router-dom";
import { ArrowRight, Clock3, BarChart3 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import frontendImage from "../../assets/images/frontend-course.jpeg";
import backendImage from "../../assets/images/backend-course.jpeg";
import dataImage from "../../assets/images/data-science-course.jpeg";
import uiuxImage from "../../assets/images/ui-ux-course.jpeg";

import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "react-i18next";

const FeaturedCourses = () => {
  const { t, i18n } = useTranslation();
  const { ref: sectionRef, visible } =
    useReveal<HTMLElement>();

  const isArabic = i18n.language === "ar";

  const courses = [
    {
      id: 1,
      category: t("courses.frontend.category"),
      title: t("courses.frontend.title"),
      description: t("courses.frontend.description"),
      image: frontendImage,
      duration: t("courses.frontend.duration"),
      level: t("courses.frontend.level"),
    },
    {
      id: 2,
      category: t("courses.backend.category"),
      title: t("courses.backend.title"),
      description: t("courses.backend.description"),
      image: backendImage,
      duration: t("courses.backend.duration"),
      level: t("courses.backend.level"),
    },
    {
      id: 3,
      category: t("courses.data.category"),
      title: t("courses.data.title"),
      description: t("courses.data.description"),
      image: dataImage,
      duration: t("courses.data.duration"),
      level: t("courses.data.level"),
    },
    {
      id: 4,
      category: t("courses.uiux.category"),
      title: t("courses.uiux.title"),
      description: t("courses.uiux.description"),
      image: uiuxImage,
      duration: t("courses.uiux.duration"),
      level: t("courses.uiux.level"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5F2] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          SECTION SEPARATOR
      ====================================================== */}
      <div className="absolute left-1/2 top-0 w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-8">
        <div className="h-px w-full bg-[#D8D1CA]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8">

        {/* ===================================================
            SECTION HEADER
        ==================================================== */}
        <div
          className={`
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-end
            sm:justify-between
            ${isArabic ? "text-right" : "text-left"}
          `}
        >
          {/* Heading */}
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
              {t("courses.eyebrow")}
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
              {t("courses.titleLine1")}
              <br className="hidden sm:block" />
              {t("courses.titleLine2")}
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
              {t("courses.description")}
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
            {t("courses.viewAll")}

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              className={`
                transition-transform
                duration-300
                ${
                  isArabic
                    ? "rotate-180 group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }
              `}
            />
          </Link>
        </div>

        {/* ===================================================
            SWIPER
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
            loop={true}
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
                COURSE CARDS
            ================================================== */}
            {courses.map((course) => (
              <SwiperSlide
                key={course.id}
                className="!h-auto"
              >
                <article
                  className={`
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-[#D8D1CA]
                    bg-white
                    transition-all
                    duration-500
                    hover:shadow-xl
                    hover:shadow-black/5
                    ${
                      isArabic
                        ? "text-right"
                        : "text-left"
                    }
                  `}
                >
                  {/* =========================================
                      COURSE IMAGE
                  ========================================== */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="
                        h-[220px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Image Overlay */}
                    <div
                      className="
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
                  <div className="flex flex-1 flex-col p-5 sm:p-6">

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
                        COURSE INFO
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
                      to={`/courses/${course.id}`}
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
                        {t("courses.viewCourse")}
                      </span>

                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        className={`
                          transition-transform
                          duration-300
                          ${
                            isArabic
                              ? "rotate-180 group-hover/link:-translate-x-1"
                              : "group-hover/link:translate-x-1"
                          }
                        `}
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
            <div className="courses-pagination !static !w-auto" />

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
                aria-label={t("courses.previous")}
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isArabic
                      ? ""
                      : "rotate-180"
                  }
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
                aria-label={t("courses.next")}
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isArabic
                      ? "rotate-180"
                      : ""
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;