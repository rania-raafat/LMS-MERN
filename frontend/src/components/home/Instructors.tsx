import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { useReveal } from "../../hooks/useReveal";
import { getInstructors } from "../../services/instructorApi";

import type { Instructor } from "../../interfaces/Instructor";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Instructors = () => {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH INSTRUCTORS FROM DATABASE
  ========================================================= */
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInstructors();

        setInstructors(data);
      } catch (error) {
        console.error("Failed to fetch instructors:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load instructors.",
        );

        setInstructors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =========================================
          SECTION SEPARATOR
      ========================================== */}
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

      {/* =========================================
          DECORATIVE BACKGROUND
      ========================================== */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-32
          top-32
          h-72
          w-72
          rounded-full
          bg-[var(--secondary-color)]
          blur-3xl
          transition-all
          duration-[1500ms]
          ${visible ? "scale-100 opacity-[0.06]" : "scale-50 opacity-0"}
        `}
      />

      <div
        className={`
          pointer-events-none
          absolute
          -left-32
          bottom-10
          h-72
          w-72
          rounded-full
          bg-[var(--primary-color)]
          blur-3xl
          transition-all
          duration-[1500ms]
          ${visible ? "scale-100 opacity-[0.05]" : "scale-50 opacity-0"}
        `}
      />

      {/* =========================================
          MAIN CONTAINER
      ========================================== */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-8
          lg:px-8
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}
        <div
          className={`
            mb-12
            grid
            grid-cols-1
            gap-8
            transition-all
            duration-1000
            ease-out
            sm:mb-16
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
            ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
        >
          {/* LEFT */}
          <div>
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[var(--primary-color)]/30
                bg-white/60
                px-4
                py-2
                text-xs
                font-medium
                sm:text-sm
              "
              style={{
                color: "var(--primary-color)",
              }}
            >
              Meet Our Instructors
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
              Learn From
              <br />
              <span className="text-[var(--primary-color)]">
                Experienced Experts
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5 lg:items-end">
            <p
              className="
                max-w-xl
                text-base
                leading-7
                text-[var(--main-color)]/60
                sm:text-lg
                lg:text-right
              "
            >
              Learn from experienced professionals who bring real-world
              knowledge, practical experience, and industry insights into every
              course.
            </p>
          </div>
        </div>

        {/* =========================================
            CONTENT
        ========================================== */}
        {loading ? (
          /* =========================================
             LOADING STATE
          ========================================== */
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-[520px]
                  animate-pulse
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#D8D1CA]
                  bg-white
                "
              >
                <div className="h-[360px] bg-[#EEEAE5]" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-24 rounded bg-[#EEEAE5]" />
                  <div className="h-5 w-40 rounded bg-[#EEEAE5]" />
                  <div className="h-3 w-full rounded bg-[#EEEAE5]" />
                  <div className="h-3 w-3/4 rounded bg-[#EEEAE5]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* =========================================
             ERROR STATE
          ========================================== */
          <div
            className="
              rounded-[28px]
              border
              border-[#D8D1CA]
              bg-white
              px-6
              py-14
              text-center
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-[var(--main-color)]
              "
            >
              Unable to load instructors.
            </p>

            <p
              className="
                mt-2
                text-sm
                text-[var(--main-color)]/50
              "
            >
              {error}
            </p>
          </div>
        ) : instructors.length === 0 ? (
          /* =========================================
             EMPTY STATE
          ========================================== */
          <div
            className="
              rounded-[28px]
              border
              border-[#D8D1CA]
              bg-white
              px-6
              py-14
              text-center
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-[var(--main-color)]
              "
            >
              No instructors available.
            </p>
          </div>
        ) : (
          /* =========================================
             SWIPER
          ========================================== */
          <div
            className={`
              transition-all
              duration-1000
              ease-out
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
            style={{
              transitionDelay: "250ms",
            }}
          >
            <Swiper
              dir="ltr"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={instructors.length > 3}
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
              {instructors.map((instructor, index) => {
                const isPrimary = index % 2 === 0;

                const accent = isPrimary
                  ? "var(--primary-color)"
                  : "var(--secondary-color)";

                const secondaryAccent = isPrimary
                  ? "var(--secondary-color)"
                  : "var(--primary-color)";

                const number = String(index + 1).padStart(2, "0");

                return (
                  <SwiperSlide key={instructor._id} className="!h-auto">
                    <article
                      className="
                          group
                          relative
                          h-full
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-[#D8D1CA]
                          bg-white
                          transition-all
                          duration-500
                          hover:shadow-2xl
                          hover:shadow-black/5
                        "
                    >
                      {/* =================================
                            IMAGE AREA
                        ================================== */}
                      <div
                        className="
                            relative
                            aspect-[0.9]
                            overflow-hidden
                            bg-[#EEEAE5]
                          "
                      >
                        {/* Glow */}
                        <div
                          className="
                              pointer-events-none
                              absolute
                              -right-12
                              -top-12
                              z-10
                              h-40
                              w-40
                              rounded-full
                              opacity-20
                              blur-3xl
                              transition-all
                              duration-700
                              group-hover:scale-125
                            "
                          style={{
                            backgroundColor: accent,
                          }}
                        />

                        {/* Instructor Image */}
                        <img
                          src={instructor.imageUrl}
                          alt={instructor.name}
                          loading="lazy"
                          className="
                              h-full
                              w-full
                              object-cover
                              object-center
                              grayscale-[10%]
                              transition-all
                              duration-700
                              group-hover:scale-105
                              group-hover:grayscale-0
                            "
                        />

                        {/* Dark Gradient */}
                        <div
                          className="
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/60
                              via-black/5
                              to-transparent
                              opacity-80
                            "
                        />

                        {/* =================================
                              NUMBER
                          ================================== */}
                        <span
                          className="
                              absolute
                              left-5
                              top-5
                              z-20
                              text-xs
                              font-bold
                              tracking-[0.18em]
                              text-white
                            "
                        >
                          {number}
                        </span>

                        {/* =================================
                              SPECIALTY
                          ================================== */}
                        <span
                          className="
                              absolute
                              right-5
                              top-5
                              z-20
                              rounded-full
                              border
                              border-white/30
                              bg-black/10
                              px-3
                              py-1.5
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]
                              text-white
                              backdrop-blur-md
                            "
                        >
                          {instructor.specialty}
                        </span>

                        {/* =================================
                              BOTTOM IMAGE CONTENT
                          ================================== */}
                        <div
                          className="
                              absolute
                              bottom-5
                              left-5
                              right-5
                              z-20
                              flex
                              items-end
                              justify-between
                              gap-4
                            "
                        >
                          <div>
                            <p
                              className="
                                  text-xs
                                  font-medium
                                  text-white/70
                                "
                            >
                              {instructor.experience}
                            </p>

                            <h3
                              className="
                                  mt-1
                                  text-xl
                                  font-semibold
                                  tracking-tight
                                  text-white
                                  sm:text-2xl
                                "
                            >
                              {instructor.name}
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
                              className="
                                  transition-transform
                                  duration-500
                                  group-hover:-translate-y-0.5
                                  group-hover:translate-x-0.5
                                "
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
                          className="
                              pointer-events-none
                              absolute
                              -bottom-10
                              -right-10
                              h-28
                              w-28
                              rounded-full
                              opacity-[0.06]
                              blur-3xl
                            "
                          style={{
                            backgroundColor: secondaryAccent,
                          }}
                        />

                        <div
                          className="
                              relative
                              z-10
                              flex
                              items-center
                              justify-between
                              gap-4
                            "
                        >
                          {/* Role */}
                          <div>
                            <p
                              className="
                                  text-xs
                                  font-semibold
                                  uppercase
                                  tracking-[0.12em]
                                "
                              style={{
                                color: accent,
                              }}
                            >
                              Instructor
                            </p>

                            <p
                              className="
                                  mt-2
                                  text-sm
                                  leading-6
                                  text-[var(--main-color)]/55
                                "
                            >
                              {instructor.role}
                            </p>
                          </div>

                          {/* LinkedIn */}
                          {instructor.linkedin ? (
                            <a
                              href={instructor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${instructor.name} LinkedIn`}
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
                                  hover:border-[var(--secondary-color)]
                                  hover:text-[var(--secondary-color)]
                                "
                            >
                              in
                            </a>
                          ) : (
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
                                  text-[var(--main-color)]/30
                                "
                            >
                              in
                            </div>
                          )}
                        </div>

                        {/* =================================
                              SMALL ACCENT LINE
                          ================================== */}
                        <div
                          className="
                              mt-5
                              flex
                              items-center
                              gap-3
                            "
                        >
                          <span
                            className="
                                h-px
                                w-8
                                transition-all
                                duration-500
                                group-hover:w-14
                              "
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
                        className="
                            absolute
                            bottom-0
                            left-0
                            h-[3px]
                            w-0
                            transition-all
                            duration-700
                            group-hover:w-full
                          "
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
                  aria-label="Previous instructors"
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
                  aria-label="Next instructors"
                >
                  <ArrowRight size={18} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            BOTTOM MESSAGE
        ========================================== */}
        {!loading && !error && instructors.length > 0 && (
          <div
            className={`
              mt-10
              flex
              items-center
              justify-center
              gap-3
              text-center
              text-xs
              text-[var(--main-color)]/45
              transition-all
              duration-700
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
            style={{
              transitionDelay: "700ms",
            }}
          >
            <span
              className="
                h-px
                w-8
                bg-[#D8D1CA]
                sm:w-12
              "
            />

            <span
              className="
                uppercase
                tracking-[0.12em]
              "
            >
              Learn From The Best
            </span>

            <span
              className="
                h-px
                w-8
                bg-[#D8D1CA]
                sm:w-12
              "
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Instructors;
