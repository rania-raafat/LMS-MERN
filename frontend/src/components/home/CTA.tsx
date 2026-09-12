import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { useReveal } from "../../hooks/useReveal";

const CTA = () => {
  const { ref: sectionRef, visible } =
    useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      dir="ltr"
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
          -left-32
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          bg-[var(--primary-color)]
          blur-3xl
          transition-all
          duration-[1500ms]
          ${
            visible
              ? "scale-100 opacity-[0.08]"
              : "scale-50 opacity-0"
          }
        `}
      />

      <div
        className={`
          pointer-events-none
          absolute
          -right-32
          top-1/3
          h-72
          w-72
          rounded-full
          bg-[var(--secondary-color)]
          blur-3xl
          transition-all
          duration-[1500ms]
          ${
            visible
              ? "scale-100 opacity-[0.08]"
              : "scale-50 opacity-0"
          }
        `}
      />

      {/* =========================================
          CONTAINER
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
            CTA CARD
        ========================================== */}
        <div
          className={`
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-[#D8D1CA]
            bg-white
            px-6
            py-14
            text-center
            shadow-sm
            transition-all
            duration-1000
            ease-out
            sm:rounded-[32px]
            sm:px-10
            sm:py-16
            lg:px-16
            lg:py-20
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          {/* =========================================
              INNER GLOW - LEFT
          ========================================== */}
          <div
            className={`
              pointer-events-none
              absolute
              -left-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[var(--primary-color)]
              blur-3xl
              transition-all
              duration-[1500ms]
              ${
                visible
                  ? "scale-100 opacity-[0.07]"
                  : "scale-50 opacity-0"
              }
            `}
          />

          {/* =========================================
              INNER GLOW - RIGHT
          ========================================== */}
          <div
            className={`
              pointer-events-none
              absolute
              -bottom-24
              -right-24
              h-64
              w-64
              rounded-full
              bg-[var(--secondary-color)]
              blur-3xl
              transition-all
              duration-[1500ms]
              ${
                visible
                  ? "scale-100 opacity-[0.07]"
                  : "scale-50 opacity-0"
              }
            `}
          />

          {/* =========================================
              CONTENT
          ========================================== */}
          <div className="relative z-10 mx-auto max-w-3xl">

            {/* =========================================
                LABEL
            ========================================== */}
            <div
              className={`
                transition-all
                duration-700
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }
              `}
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--primary-color)]/25
                  bg-[var(--background)]
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
                <Sparkles
                  size={14}
                  strokeWidth={1.7}
                />

                Start Your Journey
              </span>
            </div>

            {/* =========================================
                HEADING
            ========================================== */}
            <h2
              className={`
                mx-auto
                mt-5
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-[var(--main-color)]
                transition-all
                duration-1000
                ease-out
                sm:mt-6
                sm:text-4xl
                lg:text-5xl
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0"
                }
              `}
              style={{
                transitionDelay: "100ms",
              }}
            >
              Ready to Start
              <br />

              <span className="text-[var(--primary-color)]">
                Building Your Future?
              </span>
            </h2>

            {/* =========================================
                DESCRIPTION
            ========================================== */}
            <p
              className={`
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[var(--main-color)]/55
                transition-all
                duration-1000
                ease-out
                sm:text-base
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0"
                }
              `}
              style={{
                transitionDelay: "200ms",
              }}
            >
              Join our learning community and gain the
              practical skills you need to build real
              projects, grow your expertise, and move
              forward in your career.
            </p>

            {/* =========================================
                CTA BUTTON
            ========================================== */}
            <div
              className={`
                mt-8
                flex
                justify-center
                transition-all
                duration-1000
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0"
                }
              `}
              style={{
                transitionDelay: "300ms",
              }}
            >
              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[var(--main-color)]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                Get Started

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary-color)]
                    text-[var(--main-color)]
                    transition-transform
                    duration-300
                  "
                >
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </Link>
            </div>

            {/* =========================================
                SUPPORTING TEXT
            ========================================== */}
            <div
              className={`
                mt-7
                flex
                items-center
                justify-center
                gap-3
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-[var(--main-color)]/30
                transition-all
                duration-700
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: "500ms",
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
                  tracking-[0.20em]
                  text-black
                "
              >
                Learn • Build • Grow
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
          </div>

          {/* =========================================
              BOTTOM ACCENT
          ========================================== */}
          <div
            className={`
              absolute
              bottom-0
              left-1/2
              h-[3px]
              -translate-x-1/2
              transition-all
              duration-1000
              ${
                visible
                  ? "w-32 opacity-100"
                  : "w-0 opacity-0"
              }
            `}
            style={{
              background:
                "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;