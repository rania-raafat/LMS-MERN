import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Database,
  Palette,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useReveal } from "../../hooks/useReveal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { getProjects } from "../../services/projectApi";
import type { Project } from "../../interfaces/Project";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects = () => {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(
          Array.isArray(data)
            ? [...data].sort((a, b) => a.order - b.order)
            : [],
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load projects.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectIcon = (category: string) => {
    const normalizedCategory = category.toLowerCase();

    if (
      normalizedCategory.includes("ai") ||
      normalizedCategory.includes("machine") ||
      normalizedCategory.includes("data")
    ) {
      return Sparkles;
    }

    if (
      normalizedCategory.includes("design") ||
      normalizedCategory.includes("ui") ||
      normalizedCategory.includes("ux")
    ) {
      return Palette;
    }

    if (
      normalizedCategory.includes("backend") ||
      normalizedCategory.includes("api") ||
      normalizedCategory.includes("database")
    ) {
      return Database;
    }

    return Code2;
  };

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
        className={`pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-[var(--secondary-color)] blur-3xl transition-all duration-[1500ms] ${
          visible
            ? "scale-100 opacity-[0.05]"
            : "scale-50 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[var(--primary-color)] blur-3xl transition-all duration-[1500ms] ${
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
          className={`mb-14 grid grid-cols-1 gap-8 transition-all duration-1000 ease-out sm:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-left">
            <span
              className="inline-flex items-center rounded-full border border-[var(--primary-color)]/30 bg-white/60 px-4 py-2 text-xs font-medium sm:text-sm"
              style={{ color: "var(--primary-color)" }}
            >
              Projects
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--main-color)] sm:text-4xl lg:text-5xl">
              Explore Our Work
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-xl text-left text-base leading-7 text-[var(--main-color)]/60 sm:text-lg lg:text-right">
              Discover practical projects built to demonstrate
              real-world skills, modern technologies, and creative
              problem-solving.
            </p>

            <Link
              to="/projects"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#D8D1CA] bg-white/60 px-5 py-3 text-sm font-medium text-[var(--main-color)] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-white hover:shadow-md"
            >
              View All Projects

              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =========================================
            LOADING STATE
        ========================================== */}
        {loading && (
          <div className="flex min-h-[430px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D8D1CA] border-t-[var(--primary-color)]" />

              <p className="mt-4 text-sm text-[var(--main-color)]/50">
                Loading projects...
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            ERROR STATE
        ========================================== */}
        {!loading && error && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="rounded-2xl border border-[#D8D1CA] bg-white px-6 py-5 text-center shadow-sm">
              <p className="text-sm font-medium text-[var(--main-color)]">
                Unable to load projects.
              </p>

              <p className="mt-2 text-sm text-[var(--main-color)]/50">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            EMPTY STATE
        ========================================== */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="rounded-2xl border border-[#D8D1CA] bg-white px-8 py-6 text-center shadow-sm">
              <p className="text-sm font-medium text-[var(--main-color)]">
                No projects available.
              </p>

              <p className="mt-2 text-sm text-[var(--main-color)]/50">
                Projects will appear here once they are published.
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            PROJECT SWIPER
        ========================================== */}
        {!loading && !error && projects.length > 0 && (
          <div
            className={`transition-all duration-1000 ease-out ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Swiper
              dir="ltr"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={projects.length > 1}
              grabCursor
              autoplay={
                projects.length > 1
                  ? {
                      delay: 4500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
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
              {projects.map((project, index) => {
                const Icon = getProjectIcon(project.category);

                const accent =
                  index % 2 === 0
                    ? "var(--primary-color)"
                    : "var(--secondary-color)";

                const secondaryAccent =
                  index % 2 === 0
                    ? "var(--secondary-color)"
                    : "var(--primary-color)";

                const projectNumber = String(index + 1).padStart(
                  2,
                  "0",
                );

                return (
                  <SwiperSlide
                    key={project._id}
                    className="!h-auto"
                  >
                    <Link
                      to={`/projects/${project._id}`}
                      className="group block h-full"
                    >
                      <article
                        className="
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
                          text-left
                          shadow-sm
                          transition-all
                          duration-500
                          hover:shadow-2xl
                          hover:shadow-black/5
                          sm:p-8
                          lg:p-9
                        "
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
                            PROJECT IMAGE
                        ================================== */}
                        <div className="relative z-10 mb-6 h-44 overflow-hidden rounded-2xl bg-[var(--background)]">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />

                          <div className="pointer-events-none absolute inset-0 bg-black/5" />
                        </div>

                        {/* =================================
                            TOP
                        ================================== */}
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-bold tracking-[0.18em]"
                              style={{ color: accent }}
                            >
                              {projectNumber}
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
                            <Icon
                              size={21}
                              strokeWidth={1.7}
                            />
                          </div>
                        </div>

                        {/* =================================
                            LARGE NUMBER
                        ================================== */}
                        <div className="relative z-10 mt-10 overflow-hidden text-left">
                          <span
                            className="
                              block
                              text-[70px]
                              font-bold
                              leading-none
                              tracking-[-0.08em]
                              opacity-[0.045]
                              transition-all
                              duration-700
                              group-hover:translate-x-3
                            "
                            style={{ color: accent }}
                          >
                            {projectNumber}
                          </span>
                        </div>

                        {/* =================================
                            CONTENT
                        ================================== */}
                        <div className="relative z-10 -mt-5 text-left">
                          <h3 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-[var(--main-color)] transition-colors duration-300 sm:text-3xl">
                            {project.title}
                          </h3>

                          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--main-color)]/60 sm:text-base">
                            {project.description}
                          </p>
                        </div>

                        {/* =================================
                            TECHNOLOGIES
                        ================================== */}
                        <div className="relative z-10 mt-6 flex flex-wrap justify-start gap-2">
                          {project.technologies.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="rounded-full border border-[#E4DED8] bg-[var(--background)] px-3 py-1.5 text-[11px] text-[var(--main-color)]/65 transition-all duration-300 group-hover:bg-white"
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>

                        {/* =================================
                            FOOTER
                        ================================== */}
                        <div className="relative z-10 mt-auto pt-7">
                          <div className="flex items-center justify-between border-t border-[#E8E2DC] pt-5">
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
              <div className="projects-pagination !static !w-auto" />

              <div className="flex items-center gap-2">
                {/* Previous */}
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
                    className="rotate-180"
                  />
                </button>

                {/* Next */}
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
                  />
                </button>
              </div>
            </div>
          </div>
        )}

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
            Build. Create. Make an Impact.
          </span>

          <span className="h-px w-8 bg-[#D8D1CA] sm:w-12" />
        </div>
      </div>
    </section>
  );
};

export default Projects;