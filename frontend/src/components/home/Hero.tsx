import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import heroImage from "../../assets/images/hero-image.jpeg";
import { useReveal } from "../../hooks/useReveal";

const Hero = () => {
  const { ref: heroRef, visible } = useReveal<HTMLElement>();
  const { t } = useTranslation();

  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [completion, setCompletion] = useState(0);

  // Professional smooth counter animation
  useEffect(() => {
    if (!visible) return;

    const duration = 4000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setStudents(Math.round(12000 * easedProgress));
      setCourses(Math.round(120 * easedProgress));
      setCompletion(Math.round(95 * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setStudents(12000);
        setCourses(120);
        setCompletion(95);
      }
    };

    requestAnimationFrame(animate);
  }, [visible]);

  // Format students number professionally
  const formatStudents = (value: number) => {
    if (value < 1000) {
      return `${value}`;
    }

    if (value < 10000) {
      return `${(value / 1000).toFixed(1).replace(".0", "")}K`;
    }

    return `${Math.round(value / 1000)}K`;
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 lg:gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div className="min-w-0">

            {/* Badge */}
            <div
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d8d1ca]
                px-3.5
                sm:px-4
                py-2
                text-xs
                sm:text-sm
                bg-white/70
                mb-5
                sm:mb-6
                transition-all
                duration-700
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }
              `}
            >
              {t("hero.badge")}
            </div>

            {/* Heading */}
            <h1
              className={`
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold
                leading-[1.1]
                tracking-tight
                text-[var(--main-color)]
                transition-all
                duration-1000
                delay-100
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
              <br />
              {t("hero.titleLine3")}
            </h1>

            {/* Description */}
            <p
              className={`
                mt-5
                sm:mt-6
                text-base
                sm:text-lg
                text-gray-600
                max-w-xl
                leading-7
                transition-all
                duration-1000
                delay-200
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              {t("hero.description")}
            </p>

            {/* Buttons */}
            <div
              className={`
                mt-7
                sm:mt-8
                flex
                flex-wrap
                gap-3
                sm:gap-4
                transition-all
                duration-1000
                delay-300
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              <button
                type="button"
                className="
                  bg-[var(--main-color)]
                  text-white
                  px-5
                  sm:px-6
                  py-3
                  rounded-full
                  text-sm
                  sm:text-base
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                {t("hero.exploreCourses")}
              </button>

              <button
                type="button"
                className="
                  border
                  border-[#d8d1ca]
                  bg-white/40
                  px-5
                  sm:px-6
                  py-3
                  rounded-full
                  text-sm
                  sm:text-base
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:-translate-y-0.5
                "
              >
                {t("hero.learningPaths")}
              </button>
            </div>

            {/* Statistics */}
            <div
              className={`
                mt-10
                sm:mt-12
                flex
                items-center
                justify-center
                lg:justify-start
                gap-6
                sm:gap-10
                transition-all
                duration-1000
                delay-500
                ease-out
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >

              {/* Students */}
              <div className="min-w-[65px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--main-color)] tabular-nums">
                  {formatStudents(students)}+
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {t("hero.students")}
                </p>
              </div>

              {/* Courses */}
              <div className="min-w-[65px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--main-color)] tabular-nums">
                  {courses}+
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {t("hero.courses")}
                </p>
              </div>

              {/* Completion */}
              <div className="min-w-[65px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--main-color)] tabular-nums">
                  {completion}%
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  {t("hero.completion")}
                </p>
              </div>

            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
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
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-10 opacity-0 scale-[0.97]"
              }
            `}
          >

            {/* Decorative Glow */}
            <div
              className="
                absolute
                -top-5
                -left-5
                sm:-top-6
                sm:-left-6
                w-36
                h-36
                sm:w-48
                sm:h-48
                bg-[#d97b66]/15
                rounded-full
                blur-3xl
              "
            />

            {/* Image */}
            <img
              src={heroImage}
              alt={t("hero.imageAlt")}
              className="
                relative
                w-full
                max-w-full
                h-[380px]
                sm:h-[480px]
                lg:h-[650px]
                object-cover
                rounded-[24px]
                sm:rounded-[32px]
                shadow-xl
              "
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
