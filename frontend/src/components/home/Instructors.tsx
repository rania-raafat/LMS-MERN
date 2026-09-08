import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Instructor1 from "../../assets/images/instructor-1.jpeg";
import Instructor2 from "../../assets/images/instructor-2.jpeg";
import Instructor3 from "../../assets/images/instructor-3.jpeg";
import Instructor4 from "../../assets/images/instructor-4.jpeg";

const instructors = [
  {
    id: 1,
    number: "01",
    translationKey: "sarah",
    image: Instructor1,
    accent: "primary",
  },
  {
    id: 2,
    number: "02",
    translationKey: "mohamed",
    image: Instructor2,
    accent: "secondary",
  },
  {
    id: 3,
    number: "03",
    translationKey: "nour",
    image: Instructor3,
    accent: "primary",
  },
  {
    id: 4,
    number: "04",
    translationKey: "omar",
    image: Instructor4,
    accent: "secondary",
  },
];

const Instructors = () => {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      {/* =========================================
          SECTION SEPARATOR
      ========================================== */}
      <div className="absolute left-1/2 top-0 w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-8">
        <div className="h-px w-full bg-[#D8D1CA]" />
      </div>

      {/* =========================================
          DECORATIVE BACKGROUND
      ========================================== */}
      <div
        className={`pointer-events-none absolute -right-32 top-32 h-72 w-72 rounded-full bg-[var(--secondary-color)] blur-3xl transition-all duration-[1500ms] ${
          visible
            ? "scale-100 opacity-[0.06]"
            : "scale-50 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[var(--primary-color)] blur-3xl transition-all duration-[1500ms] ${
          visible
            ? "scale-100 opacity-[0.05]"
            : "scale-50 opacity-0"
        }`}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8">

        {/* =========================================
            HEADER
        ========================================== */}
        <div
          className={`mb-12 grid grid-cols-1 gap-8 transition-all duration-1000 ease-out sm:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* LEFT */}
          <div>
            <span
              className="inline-flex items-center rounded-full border border-[var(--primary-color)]/30 bg-white/60 px-4 py-2 text-xs font-medium sm:text-sm"
              style={{
                color: "var(--primary-color)",
              }}
            >
              {t("instructors.label")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--main-color)] sm:text-4xl lg:text-5xl">
              {t("instructors.titleLine1")}
              <br />
              <span className="text-[var(--primary-color)]">
                {t("instructors.titleLine2")}
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5 lg:items-end">
            <p
              className={`max-w-xl text-base leading-7 text-[var(--main-color)]/60 sm:text-lg ${
                isArabic ? "lg:text-left" : "lg:text-right"
              }`}
            >
              {t("instructors.description")}
            </p>
          </div>
        </div>

        {/* =========================================
            SWIPER
        ========================================== */}
        <div
          className={`transition-all duration-1000 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "250ms",
          }}
        >
          <Swiper
            dir="ltr"
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".instructors-pagination",
            }}
            navigation={{
              nextEl: ".instructors-next",
              prevEl: ".instructors-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="!overflow-hidden"
          >
            {instructors.map((instructor) => {
              const accent =
                instructor.accent === "primary"
                  ? "var(--primary-color)"
                  : "var(--secondary-color)";

              const secondaryAccent =
                instructor.accent === "primary"
                  ? "var(--secondary-color)"
                  : "var(--primary-color)";

              const instructorKey = `instructors.${instructor.translationKey}`;

              return (
                <SwiperSlide
                  key={instructor.id}
                  className="!h-auto"
                >
                  <article className="group relative h-full overflow-hidden rounded-[28px] border border-[#D8D1CA] bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/5">

                    {/* =================================
                        IMAGE AREA
                    ================================== */}
                    <div className="relative aspect-[0.9] overflow-hidden bg-[#EEEAE5]">

                      {/* Glow */}
                      <div
                        className="pointer-events-none absolute -right-12 -top-12 z-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:scale-125"
                        style={{
                          backgroundColor: accent,
                        }}
                      />

                      {/* Instructor Image */}
                      <img
                        src={instructor.image}
                        alt={t(`${instructorKey}.name`)}
                        loading="lazy"
                        className="h-full w-full object-cover object-center grayscale-[10%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />

                      {/* Dark Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80" />

                      {/* =================================
                          NUMBER
                      ================================== */}
                      <span className="absolute left-5 top-5 z-20 text-xs font-bold tracking-[0.18em] text-white">
                        {instructor.number}
                      </span>

                      {/* =================================
                          SPECIALTY
                      ================================== */}
                      <span className="absolute right-5 top-5 z-20 rounded-full border border-white/30 bg-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {t(`${instructorKey}.specialty`)}
                      </span>

                      {/* =================================
                          BOTTOM IMAGE CONTENT
                      ================================== */}
                      <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between gap-4">

                        <div>
                          <p className="text-xs font-medium text-white/70">
                            {t(`${instructorKey}.experience`)}
                          </p>

                          <h3 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                            {t(`${instructorKey}.name`)}
                          </h3>
                        </div>

                        {/* Arrow */}
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-[var(--main-color)]
                            transition-all
                            duration-500
                            group-hover:scale-110
                          "
                        >
                          <ArrowUpRight
                            size={17}
                            strokeWidth={1.8}
                            className={`transition-transform duration-500 ${
                              isArabic
                                ? "group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
                                : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* =================================
                        CONTENT
                    ================================== */}
                    <div className="relative p-5 sm:p-6">

                      {/* Decorative Glow */}
                      <div
                        className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-[0.06] blur-3xl"
                        style={{
                          backgroundColor: secondaryAccent,
                        }}
                      />

                      <div className="relative z-10 flex items-center justify-between gap-4">

                        {/* Role */}
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-[0.12em]"
                            style={{
                              color: accent,
                            }}
                          >
                            {t("instructors.instructor")}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-[var(--main-color)]/55">
                            {t(`${instructorKey}.role`)}
                          </p>
                        </div>

                        {/* LinkedIn Style */}
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#D8D1CA]
                            text-xs
                            font-semibold
                            text-[var(--main-color)]/60
                            transition-all
                            duration-300
                            group-hover:border-[var(--secondary-color)]
                            group-hover:text-[var(--secondary-color)]
                          "
                        >
                          in
                        </div>
                      </div>

                      {/* =================================
                          SMALL ACCENT LINE
                      ================================== */}
                      <div className="mt-5 flex items-center gap-3">
                        <span
                          className="h-px w-8 transition-all duration-500 group-hover:w-14"
                          style={{
                            backgroundColor: accent,
                          }}
                        />

                        <Sparkles
                          size={13}
                          strokeWidth={1.6}
                          style={{
                            color: accent,
                          }}
                        />
                      </div>
                    </div>

                    {/* =================================
                        BOTTOM ACCENT
                    ================================== */}
                    <div
                      className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full"
                      style={{
                        backgroundColor: accent,
                      }}
                    />
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* =========================================
              SWIPER CONTROLS
          ========================================== */}
          <div
            className={`mt-7 flex items-center justify-between transition-all duration-700 ease-out ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: "500ms",
            }}
          >
            {/* Pagination */}
            <div className="instructors-pagination !static !w-auto" />

            {/* Navigation */}
            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                type="button"
                className="
                  instructors-prev
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
                aria-label={t("instructors.previous")}
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className={isArabic ? "" : "rotate-180"}
                />
              </button>

              {/* Next */}
              <button
                type="button"
                className="
                  instructors-next
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
                aria-label={t("instructors.next")}
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className={isArabic ? "rotate-180" : ""}
                />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM MESSAGE
        ========================================== */}
        <div
          className={`mt-10 flex items-center justify-center gap-3 text-center text-xs text-[var(--main-color)]/45 transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDelay: "700ms",
          }}
        >
          <span className="h-px w-8 bg-[#D8D1CA] sm:w-12" />

          <span className="uppercase tracking-[0.12em]">
            {t("instructors.bottomMessage")}
          </span>

          <span className="h-px w-8 bg-[#D8D1CA] sm:w-12" />
        </div>
      </div>
    </section>
  );
};

export default Instructors;