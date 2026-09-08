import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Database,
  Palette,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReveal } from "../../hooks/useReveal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects = () => {
  const { t, i18n } = useTranslation();

  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  const isArabic = i18n.language === "ar";

  const projects = [
    {
      id: 1,
      number: "01",
      category: t("projects.ecommerce.category"),
      title: t("projects.ecommerce.title"),
      description: t("projects.ecommerce.description"),
      skills: ["React", "Node.js", "MongoDB"],
      type: t("projects.fullStack"),
      icon: Code2,
      accent: "primary",
    },
    {
      id: 2,
      number: "02",
      category: t("projects.analytics.category"),
      title: t("projects.analytics.title"),
      description: t("projects.analytics.description"),
      skills: ["Python", "Data", "Machine Learning"],
      type: t("projects.dataAi"),
      icon: Sparkles,
      accent: "secondary",
    },
    {
      id: 3,
      number: "03",
      category: t("projects.mobile.category"),
      title: t("projects.mobile.title"),
      description: t("projects.mobile.description"),
      skills: ["Figma", "UI Design", "UX"],
      type: t("projects.design"),
      icon: Palette,
      accent: "primary",
    },
    {
      id: 4,
      number: "04",
      category: t("projects.api.category"),
      title: t("projects.api.title"),
      description: t("projects.api.description"),
      skills: ["Node.js", "Express", "REST API"],
      type: t("projects.backend"),
      icon: Database,
      accent: "secondary",
    },
  ];

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
        className={`pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-[var(--secondary-color)] opacity-[0.05] blur-3xl transition-all duration-[1500ms] ${
          visible ? "scale-100 opacity-[0.05]" : "scale-50 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[var(--primary-color)] opacity-[0.05] blur-3xl transition-all duration-[1500ms] ${
          visible ? "scale-100 opacity-[0.05]" : "scale-50 opacity-0"
        }`}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* =========================================
            HEADER
        ========================================== */}
        <div
          className={`mb-14 grid grid-cols-1 gap-8 transition-all duration-1000 ease-out sm:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className={isArabic ? "text-right" : "text-left"}>
            <span
              className="inline-flex items-center rounded-full border border-[var(--primary-color)]/30 bg-white/60 px-4 py-2 text-xs font-medium sm:text-sm"
              style={{ color: "var(--primary-color)" }}
            >
              {t("projects.label")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--main-color)] sm:text-4xl lg:text-5xl">
              {t("projects.title")}
            </h2>
          </div>

          <div
            className={`flex flex-col gap-5 ${
              isArabic ? "lg:items-start" : "lg:items-end"
            }`}
          >
            <p
              className={`max-w-xl text-base leading-7 text-[var(--main-color)]/60 sm:text-lg ${
                isArabic ? "text-right" : "lg:text-right"
              }`}
            >
              {t("projects.description")}
            </p>

            <Link
              to="/projects"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#D8D1CA] bg-white/60 px-5 py-3 text-sm font-medium text-[var(--main-color)] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-white hover:shadow-md"
            >
              {t("projects.viewAll")}

              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =========================================
            PROJECT SWIPER
        ========================================== */}
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Swiper
            /*
              KEEP SWIPER LTR.

              Arabic only changes:
              - card text alignment
              - number hover direction
              - arrow icon direction

              Physical positions NEVER change.
            */
            dir="ltr"
            modules={[Navigation, Pagination, Autoplay]}
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
              el: ".projects-pagination",
            }}
            navigation={{
              nextEl: ".projects-next",
              prevEl: ".projects-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
            }}
            className="!overflow-hidden"
          >
            {projects.map((project) => {
              const Icon = project.icon;

              const accent =
                project.accent === "primary"
                  ? "var(--primary-color)"
                  : "var(--secondary-color)";

              const secondaryAccent =
                project.accent === "primary"
                  ? "var(--secondary-color)"
                  : "var(--primary-color)";

              return (
                <SwiperSlide key={project.id} className="!h-auto">
                  <Link
                    to={`/projects/${project.id}`}
                    className="group block h-full"
                  >
                    <article
                      className={`
                        relative
                        flex
                        h-full
                        min-h-[430px]
                        flex-col
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-[#D8D1CA]
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-500
                        hover:shadow-2xl
                        hover:shadow-black/5
                        sm:p-8
                        lg:p-9
                        ${isArabic ? "text-right" : "text-left"}
                      `}
                    >
                      {/* =================================
                          DECORATIVE SHAPE
                      ================================== */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.07] blur-3xl transition-transform duration-700 group-hover:scale-125"
                        style={{
                          backgroundColor: accent,
                        }}
                      />

                      <div
                        className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full opacity-[0.045] blur-3xl"
                        style={{
                          backgroundColor: secondaryAccent,
                        }}
                      />

                      {/* =================================
                          TOP
                      ================================== */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div
                          className={`flex items-center gap-3 ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span
                            className="text-xs font-bold tracking-[0.18em]"
                            style={{ color: accent }}
                          >
                            {project.number}
                          </span>

                          <span className="h-px w-8 bg-[#D8D1CA]" />

                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--main-color)]/45 sm:text-[11px]">
                            {project.category}
                          </span>
                        </div>

                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                          style={{
                            backgroundColor: "var(--background)",
                            color: accent,
                          }}
                        >
                          <Icon size={21} strokeWidth={1.7} />
                        </div>
                      </div>

                      {/* =================================
                          LARGE NUMBER
                      ================================== */}
                      <div
                        className={`relative z-10 mt-10 overflow-hidden ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        <span
                          className={`
                            block
                            text-[70px]
                            font-bold
                            leading-none
                            tracking-[-0.08em]
                            opacity-[0.045]
                            transition-all
                            duration-700
                            ${
                              isArabic
                                ? "group-hover:-translate-x-3"
                                : "group-hover:translate-x-3"
                            }
                          `}
                          style={{ color: accent }}
                        >
                          {project.number}
                        </span>
                      </div>

                      {/* =================================
                          CONTENT
                      ================================== */}
                      <div
                        className={`relative z-10 -mt-5 ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        <h3 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-[var(--main-color)] transition-colors duration-300 sm:text-3xl">
                          {project.title}
                        </h3>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--main-color)]/60 sm:text-base">
                          {project.description}
                        </p>
                      </div>

                      {/* =================================
                          SKILLS
                      ================================== */}
                      <div
                        className={`relative z-10 mt-6 flex flex-wrap gap-2 ${
                          isArabic ? "justify-end" : "justify-start"
                        }`}
                      >
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[#E4DED8] bg-[var(--background)] px-3 py-1.5 text-[11px] text-[var(--main-color)]/65 transition-all duration-300 group-hover:bg-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* =================================
                          FOOTER
                      ================================== */}
                      <div className="relative z-10 mt-auto pt-7">
                        <div
                          className={`flex items-center justify-between border-t border-[#E8E2DC] pt-5 ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span
                            className="text-xs font-medium uppercase tracking-[0.14em]"
                            style={{ color: accent }}
                          >
                            {project.type}
                          </span>

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#D8D1CA]
                              text-[var(--main-color)]
                              transition-all
                              duration-500
                              group-hover:translate-x-1
                            "
                          >
                            <ArrowUpRight
                              size={17}
                              strokeWidth={1.8}
                              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div
                        className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 group-hover:w-full"
                        style={{
                          backgroundColor: accent,
                        }}
                      />
                    </article>
                  </Link>
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
            style={{ transitionDelay: "500ms" }}
          >
            {/* Pagination ALWAYS stays on the LEFT */}
            <div className="projects-pagination !static !w-auto" />

            {/* Arrows ALWAYS stay on the RIGHT */}
            <div className="flex items-center gap-2">
              {/* Previous button - position NEVER changes */}
              <button
                type="button"
                className="
                  projects-prev
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
                aria-label="Previous projects"
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className={isArabic ? "" : "rotate-180"}
                />
              </button>

              {/* Next button - position NEVER changes */}
              <button
                type="button"
                className="
                  projects-next
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
                aria-label="Next projects"
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
          style={{ transitionDelay: "700ms" }}
        >
          <span className="h-px w-8 bg-[#D8D1CA] sm:w-12" />

          <span className="uppercase tracking-[0.12em]">
            {t("projects.bottomMessage")}
          </span>

          <span className="h-px w-8 bg-[#D8D1CA] sm:w-12" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
