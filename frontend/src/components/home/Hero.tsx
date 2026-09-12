import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import heroImage from "../../assets/images/hero-image.jpeg";
import { useReveal } from "../../hooks/useReveal";

const Hero = () => {
  const { ref: heroRef, visible } =
    useReveal<HTMLElement>();

  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [completion, setCompletion] = useState(0);

  /* =========================================================
     COUNTER ANIMATION
  ========================================================= */
  useEffect(() => {
    if (!visible) return;

    const duration = 4000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth ease-out
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      setStudents(
        Math.round(12000 * easedProgress)
      );

      setCourses(
        Math.round(120 * easedProgress)
      );

      setCompletion(
        Math.round(95 * easedProgress)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setStudents(12000);
        setCourses(120);
        setCompletion(95);
      }
    };

    const animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [visible]);

  /* =========================================================
     FORMAT STUDENTS NUMBER
  ========================================================= */
  const formatStudents = (value: number) => {
    if (value < 1000) {
      return `${value}`;
    }

    if (value < 10000) {
      return `${(value / 1000)
        .toFixed(1)
        .replace(".0", "")}K`;
    }

    return `${Math.round(value / 1000)}K`;
  };

  return (
    <section
      ref={heroRef}
      className="
        flex
        min-h-screen
        items-center
        overflow-hidden
        pt-28
        pb-12
        sm:pt-32
        sm:pb-16
      "
    >
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
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            sm:gap-14
            lg:grid-cols-2
            lg:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="min-w-0">

            {/* =================================================
                BADGE
            ================================================== */}
            <div
              className={`
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d8d1ca]
                bg-white/70
                px-3.5
                py-2
                text-xs
                transition-all
                duration-700
                ease-out
                sm:mb-6
                sm:px-4
                sm:text-sm
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }
              `}
            >
              Learn. Build. Grow.
            </div>

            {/* =================================================
                HEADING
            ================================================== */}
            <h1
              className={`
                text-4xl
                font-bold
                leading-[1.1]
                tracking-tight
                text-[var(--main-color)]
                transition-all
                duration-1000
                delay-100
                ease-out
                sm:text-5xl
                lg:text-7xl
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              Build Skills.
              <br />
              Build Projects.
              <br />
              Build Your Future.
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}
            <p
              className={`
                mt-5
                max-w-xl
                text-base
                leading-7
                text-gray-600
                transition-all
                duration-1000
                delay-200
                ease-out
                sm:mt-6
                sm:text-lg
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              Learn practical skills through
              hands-on courses, real-world projects,
              and structured learning paths designed
              to help you grow with confidence.
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}
            <div
              className={`
                mt-7
                flex
                flex-wrap
                gap-3
                transition-all
                duration-1000
                delay-300
                ease-out
                sm:mt-8
                sm:gap-4
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              {/* Explore Courses */}
              <Link
                to="/courses"
                className="
                  rounded-full
                  bg-[var(--main-color)]
                  px-5
                  py-3
                  text-sm
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  sm:px-6
                  sm:text-base
                "
              >
                Explore Courses
              </Link>

              {/* Learning Paths */}
              <Link
                to="/learning-paths"
                className="
                  rounded-full
                  border
                  border-[#d8d1ca]
                  bg-white/40
                  px-5
                  py-3
                  text-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  sm:px-6
                  sm:text-base
                "
              >
                Learning Paths
              </Link>
            </div>

            {/* =================================================
                STATISTICS
            ================================================== */}
            <div
              className={`
                mt-10
                flex
                items-center
                justify-center
                gap-6
                transition-all
                duration-1000
                delay-500
                ease-out
                sm:mt-12
                sm:gap-10
                lg:justify-start
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              {/* =================================================
                  STUDENTS
              ================================================== */}
              <div className="min-w-[65px]">
                <h3
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    text-[var(--main-color)]
                    sm:text-3xl
                  "
                >
                  {formatStudents(students)}+
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:text-sm
                  "
                >
                  Learners
                </p>
              </div>

              {/* =================================================
                  COURSES
              ================================================== */}
              <div className="min-w-[65px]">
                <h3
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    text-[var(--main-color)]
                    sm:text-3xl
                  "
                >
                  {courses}+
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:text-sm
                  "
                >
                  Courses
                </p>
              </div>

              {/* =================================================
                  COMPLETION
              ================================================== */}
              <div className="min-w-[65px]">
                <h3
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    text-[var(--main-color)]
                    sm:text-3xl
                  "
                >
                  {completion}%
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:text-sm
                  "
                >
                  Completion
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}
          <div
            className={`
              relative
              w-full
              min-w-0
              transition-all
              duration-[1200ms]
              delay-300
              ease-out
              ${
                visible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-[0.97] opacity-0"
              }
            `}
          >
            {/* =================================================
                DECORATIVE GLOW
            ================================================== */}
            <div
              className="
                absolute
                -left-5
                -top-5
                h-36
                w-36
                rounded-full
                bg-[#d97b66]/15
                blur-3xl
                sm:-left-6
                sm:-top-6
                sm:h-48
                sm:w-48
              "
            />

            {/* =================================================
                HERO IMAGE
            ================================================== */}
            <img
              src={heroImage}
              alt="Students learning and building digital skills"
              className="
                relative
                h-[380px]
                w-full
                max-w-full
                rounded-[24px]
                object-cover
                shadow-xl
                sm:h-[480px]
                sm:rounded-[32px]
                lg:h-[650px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;