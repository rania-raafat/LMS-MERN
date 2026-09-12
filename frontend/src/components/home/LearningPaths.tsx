import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Flag,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useReveal } from "../../hooks/useReveal";
import { getLearningPaths } from "../../services/learningPathApi";

import type { LearningPath } from "../../interfaces/LearningPath";

const LearningPaths = () => {
  const {
    ref: sectionRef,
    visible,
  } = useReveal<HTMLElement>();

  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH ONLY FIRST 3 LEARNING PATHS FOR HOME
  ========================================================= */
  useEffect(() => {
    let isMounted = true;

    const fetchLearningPaths = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getLearningPaths();

        if (!isMounted) return;

        setPaths(
          Array.isArray(data)
            ? [...data]
                .sort((a, b) => a.order - b.order)
                .slice(0, 3)
            : []
        );
      } catch (error) {
        if (!isMounted) return;

        console.error(
          "Failed to fetch learning paths:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load learning paths."
        );

        setPaths([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLearningPaths();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
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
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div
          className={`
            grid
            grid-cols-1
            gap-7
            transition-all
            duration-1000
            ease-out
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-end
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          {/* TITLE */}
          <div className="max-w-xl text-left lg:order-1">
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
              Learning Paths
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
              Choose Your
              <br />
              Learning Path
            </h2>
          </div>

          {/* DESCRIPTION + BUTTON */}
          <div
            className="
              flex
              flex-col
              gap-5
              lg:order-2
              lg:items-end
            "
          >
            <p
              className="
                max-w-xl
                text-left
                text-base
                leading-7
                text-[#77716B]
                sm:text-lg
                lg:text-right
              "
            >
              Follow a structured learning journey
              designed to help you build practical
              skills, complete real projects, and move
              confidently toward your career goals.
            </p>

            <Link
              to="/learning-paths"
              className="
                group
                inline-flex
                w-fit
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
                duration-300
                hover:bg-white
                hover:shadow-md
              "
            >
              View All Paths

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
        </div>

        {/* =====================================================
            LOADING STATE - DESKTOP
        ====================================================== */}
        {loading && (
          <div className="mt-20 hidden lg:block">
            <div className="grid min-h-[760px] grid-cols-3 gap-12 px-[8%]">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`
                    flex
                    items-center
                    justify-center
                    ${
                      item % 2 === 1
                        ? "pb-[410px]"
                        : "pt-[410px]"
                    }
                  `}
                >
                  <div
                    className="
                      h-[430px]
                      w-[350px]
                      animate-pulse
                      rounded-[26px]
                      border
                      border-[#D8D1CA]
                      bg-white
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            LOADING STATE - MOBILE
        ====================================================== */}
        {loading && (
          <div className="relative mt-14 lg:hidden">
            <div className="space-y-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    ml-[52px]
                    h-[330px]
                    animate-pulse
                    rounded-[24px]
                    border
                    border-[#D8D1CA]
                    bg-white
                  "
                />
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR STATE
        ====================================================== */}
        {!loading && error && (
          <div
            className="
              mt-14
              rounded-[26px]
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
              Unable to load learning paths.
            </p>

            <p
              className="
                mt-2
                text-sm
                text-[#77716B]
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}
        {!loading &&
          !error &&
          paths.length === 0 && (
            <div
              className="
                mt-14
                rounded-[26px]
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
                No learning paths available.
              </p>
            </div>
          )}

        {/* =====================================================
            DESKTOP ROAD
        ====================================================== */}
        {!loading &&
          !error &&
          paths.length > 0 && (
            <div className="relative mt-20 hidden lg:block">
              {/* Road shadow */}
              <div
                className={`
                  absolute
                  left-[8%]
                  right-[8%]
                  top-1/2
                  h-5
                  -translate-y-1/2
                  rounded-full
                  bg-[#D8D1CA]/50
                  transition-all
                  duration-[1800ms]
                  ease-out
                  ${
                    visible
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }
                `}
                style={{
                  transformOrigin: "left center",
                }}
              />

              {/* Main road */}
              <div
                className={`
                  absolute
                  left-[8%]
                  right-[8%]
                  top-1/2
                  h-8
                  -translate-y-1/2
                  rounded-full
                  bg-[var(--main-color)]
                  shadow-inner
                  transition-all
                  duration-[1800ms]
                  ease-out
                  ${
                    visible
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }
                `}
                style={{
                  transformOrigin: "left center",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-around px-6">
                  {Array.from({
                    length: 12,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="
                        h-[2px]
                        w-8
                        rounded-full
                        bg-[#F7F5F2]/70
                      "
                    />
                  ))}
                </div>
              </div>

              {/* =================================================
                  START
              ================================================== */}
              <div
                className={`
                  absolute
                  left-[3%]
                  top-1/2
                  z-20
                  -translate-y-1/2
                  transition-all
                  duration-700
                  ${
                    visible
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }
                `}
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-[5px]
                    border-[#F7F5F2]
                    bg-[#D97B66]
                    text-white
                    shadow-lg
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                    "
                  >
                    Start
                  </span>
                </div>
              </div>

              {/* =================================================
                  FINISH
              ================================================== */}
              <div
                className={`
                  absolute
                  right-[3%]
                  top-1/2
                  z-20
                  -translate-y-1/2
                  transition-all
                  duration-700
                  ${
                    visible
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: "1100ms",
                }}
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-[5px]
                    border-[#F7F5F2]
                    bg-[#5C6BC0]
                    text-white
                    shadow-lg
                  "
                >
                  <Flag
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* =================================================
                  DESKTOP PATHS
              ================================================== */}
              <div
                className="
                  relative
                  grid
                  min-h-[760px]
                  grid-cols-3
                  gap-12
                  px-[8%]
                "
              >
                {paths.map((path, index) => {
                  const isAbove = index % 2 === 0;

                  const number = String(
                    index + 1
                  ).padStart(2, "0");

                  return (
                    <div
                      key={path._id}
                      className={`
                        relative
                        flex
                        justify-center
                        ${
                          isAbove
                            ? "items-start pb-[410px]"
                            : "items-end pt-[410px]"
                        }
                      `}
                    >
                      {/* Vertical connector */}
                      <div
                        className={`
                          absolute
                          left-1/2
                          z-10
                          w-px
                          -translate-x-1/2
                          bg-[#D8D1CA]
                          transition-all
                          duration-1000
                          ease-out
                          ${
                            isAbove
                              ? "bottom-[330px] h-36 origin-bottom"
                              : "top-[330px] h-36 origin-top"
                          }
                          ${
                            visible
                              ? "scale-y-100 opacity-100"
                              : "scale-y-0 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${
                            500 + index * 180
                          }ms`,
                        }}
                      />

                      {/* Number */}
                      <div
                        className={`
                          absolute
                          left-1/2
                          z-30
                          flex
                          h-14
                          w-14
                          -translate-x-1/2
                          items-center
                          justify-center
                          rounded-full
                          border-[5px]
                          border-[#F7F5F2]
                          bg-[var(--secondary-color)]
                          text-xs
                          font-bold
                          text-white
                          shadow-lg
                          transition-all
                          duration-700
                          ${
                            isAbove
                              ? "bottom-[302px]"
                              : "top-[302px]"
                          }
                          ${
                            visible
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${
                            600 + index * 180
                          }ms`,
                        }}
                      >
                        {number}

                        <span
                          className="
                            absolute
                            inset-[-7px]
                            rounded-full
                            border
                            border-[#5C6BC0]/20
                          "
                        />
                      </div>

                      {/* Card */}
                      <Link
                        to={`/learning-paths/${path._id}`}
                        className={`
                          group
                          relative
                          z-20
                          w-[350px]
                          transition-all
                          duration-700
                          ease-out
                          ${
                            visible
                              ? "translate-y-0 opacity-100"
                              : isAbove
                                ? "-translate-y-10 opacity-0"
                                : "translate-y-10 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${
                            750 + index * 180
                          }ms`,
                        }}
                      >
                        <article
                          className="
                            relative
                            w-[350px]
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-[#D8D1CA]
                            bg-white
                            text-left
                            shadow-sm
                            transition-all
                            duration-500
                            hover:-translate-y-2
                            hover:shadow-2xl
                            hover:shadow-black/5
                          "
                        >
                          {/* Decorative circle */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-16
                              -top-16
                              h-44
                              w-44
                              rounded-full
                              bg-[#5C6BC0]/7
                              blur-3xl
                              transition-transform
                              duration-700
                              group-hover:scale-125
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              -bottom-20
                              left-1/3
                              h-40
                              w-40
                              rounded-full
                              bg-[#D97B66]/5
                              blur-3xl
                            "
                          />

                          <div
                            className="
                              relative
                              p-6
                              xl:p-7
                            "
                          >
                            {/* Top row */}
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className="
                                  text-[11px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-[var(--secondary-color)]
                                "
                              >
                                Learning Path
                              </span>

                              <span
                                className="
                                  rounded-full
                                  bg-[#F0EEEA]
                                  px-3
                                  py-1.5
                                  text-[11px]
                                  font-medium
                                  text-[#77716B]
                                "
                              >
                                {path.level}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              className="
                                mt-5
                                text-xl
                                font-semibold
                                leading-tight
                                text-[#292725]
                                transition-colors
                                duration-300
                                group-hover:text-[var(--secondary-color)]
                                xl:text-2xl
                              "
                            >
                              {path.title}
                            </h3>

                            {/* Description */}
                            <p
                              className="
                                mt-3
                                text-sm
                                leading-6
                                text-[#77716B]
                              "
                            >
                              {path.description}
                            </p>

                            {/* Skills */}
                            <div
                              className="
                                mt-5
                                flex
                                flex-wrap
                                justify-start
                                gap-2
                              "
                            >
                              {path.skills.map(
                                (skill) => (
                                  <span
                                    key={skill}
                                    className="
                                      inline-flex
                                      items-center
                                      gap-1.5
                                      rounded-full
                                      border
                                      border-[#E4DED8]
                                      bg-[#F7F5F2]
                                      px-3
                                      py-1.5
                                      text-[11px]
                                      text-[#77716B]
                                    "
                                  >
                                    <Check
                                      size={11}
                                      strokeWidth={2}
                                      className="
                                        text-[var(--secondary-color)]
                                      "
                                    />

                                    {skill}
                                  </span>
                                )
                              )}
                            </div>

                            {/* Bottom */}
                            <div
                              className="
                                mt-6
                                flex
                                items-center
                                justify-between
                                border-t
                                border-[#E8E2DC]
                                pt-5
                              "
                            >
                              <div>
                                <span
                                  className="
                                    block
                                    text-2xl
                                    font-bold
                                    leading-none
                                    text-[var(--main-color)]
                                  "
                                >
                                  {path.coursesCount}
                                </span>

                                <span
                                  className="
                                    mt-1
                                    block
                                    text-[11px]
                                    text-[#77716B]
                                  "
                                >
                                  Courses
                                </span>
                              </div>

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
                                  transition-all
                                  duration-500
                                  group-hover:translate-x-1
                                  group-hover:border-[var(--secondary-color)]
                                  group-hover:bg-[var(--secondary-color)]
                                  group-hover:text-white
                                "
                              >
                                <ArrowRight
                                  size={16}
                                  strokeWidth={1.8}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Accent */}
                          <div
                            className="
                              absolute
                              bottom-0
                              left-0
                              h-[2px]
                              w-0
                              bg-[var(--secondary-color)]
                              transition-all
                              duration-700
                              group-hover:w-full
                            "
                          />
                        </article>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* =====================================================
            MOBILE ROAD
        ====================================================== */}
        {!loading &&
          !error &&
          paths.length > 0 && (
            <div className="relative mt-14 lg:hidden">
              {/* Road shadow */}
              <div
                className={`
                  absolute
                  bottom-7
                  left-[23px]
                  top-7
                  w-5
                  -translate-x-1/2
                  rounded-full
                  bg-[#D8D1CA]/50
                  transition-all
                  duration-[1800ms]
                  ease-out
                  ${
                    visible
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }
                `}
                style={{
                  transformOrigin: "top center",
                }}
              />

              {/* Road */}
              <div
                className={`
                  absolute
                  bottom-7
                  left-[23px]
                  top-7
                  z-0
                  w-7
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--main-color)]
                  transition-all
                  duration-[1800ms]
                  ease-out
                  ${
                    visible
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }
                `}
                style={{
                  transformOrigin: "top center",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-around py-5">
                  {Array.from({
                    length: 15,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="
                        h-7
                        w-[2px]
                        rounded-full
                        bg-[#F7F5F2]/70
                      "
                    />
                  ))}
                </div>
              </div>

              {/* =================================================
                  START
              ================================================== */}
              <div
                className={`
                  relative
                  z-20
                  mb-8
                  flex
                  items-center
                  gap-4
                  transition-all
                  duration-700
                  ${
                    visible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-5 opacity-0"
                  }
                `}
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[5px]
                    border-[#F7F5F2]
                    bg-[var(--primary-color)]
                    text-[9px]
                    font-bold
                    uppercase
                    text-white
                    shadow-lg
                  "
                >
                  Start
                </div>

                <span
                  className="
                    text-left
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#77716B]
                  "
                >
                  Your Journey
                </span>
              </div>

              {/* =================================================
                  MOBILE CARDS
              ================================================== */}
              <div className="space-y-8">
                {paths.map((path, index) => {
                  const number = String(
                    index + 1
                  ).padStart(2, "0");

                  return (
                    <div
                      key={path._id}
                      className="relative pl-[52px]"
                    >
                      {/* Milestone */}
                      <div
                        className={`
                          absolute
                          left-0
                          top-8
                          z-30
                          flex
                          h-[46px]
                          w-[46px]
                          items-center
                          justify-center
                          rounded-full
                          border-[5px]
                          border-[#F7F5F2]
                          bg-[var(--secondary-color)]
                          text-[11px]
                          font-bold
                          text-white
                          shadow-lg
                          transition-all
                          duration-700
                          ${
                            visible
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${
                            500 + index * 180
                          }ms`,
                        }}
                      >
                        {number}
                      </div>

                      {/* Card */}
                      <Link
                        to={`/learning-paths/${path._id}`}
                        className={`
                          group
                          block
                          transition-all
                          duration-700
                          ease-out
                          ${
                            visible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                          }
                        `}
                        style={{
                          transitionDelay: `${
                            700 + index * 180
                          }ms`,
                        }}
                      >
                        <article
                          className="
                            relative
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-[#D8D1CA]
                            bg-white
                            text-left
                            shadow-sm
                            transition-all
                            duration-500
                            active:scale-[0.99]
                            hover:-translate-y-1
                            hover:shadow-xl
                          "
                        >
                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-16
                              -top-16
                              h-40
                              w-40
                              rounded-full
                              bg-[#5C6BC0]/7
                              blur-3xl
                              transition-transform
                              duration-700
                              group-hover:scale-125
                            "
                          />

                          <div className="relative p-5 sm:p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.16em]
                                  text-[#5C6BC0]
                                  sm:text-[11px]
                                "
                              >
                                Learning Path
                              </span>

                              <span
                                className="
                                  shrink-0
                                  rounded-full
                                  bg-[#F0EEEA]
                                  px-3
                                  py-1.5
                                  text-[10px]
                                  font-medium
                                  text-[#77716B]
                                  sm:text-xs
                                "
                              >
                                {path.level}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              className="
                                mt-4
                                text-xl
                                font-semibold
                                leading-tight
                                text-[#292725]
                                transition-colors
                                duration-300
                                group-hover:text-[var(--secondary-color)]
                                sm:text-2xl
                              "
                            >
                              {path.title}
                            </h3>

                            {/* Description */}
                            <p
                              className="
                                mt-3
                                text-sm
                                leading-6
                                text-[#77716B]
                                sm:text-base
                              "
                            >
                              {path.description}
                            </p>

                            {/* Skills */}
                            <div
                              className="
                                mt-5
                                flex
                                flex-wrap
                                justify-start
                                gap-2
                              "
                            >
                              {path.skills.map(
                                (skill) => (
                                  <span
                                    key={skill}
                                    className="
                                      inline-flex
                                      items-center
                                      gap-1.5
                                      rounded-full
                                      border
                                      border-[#E4DED8]
                                      bg-[#F7F5F2]
                                      px-3
                                      py-1.5
                                      text-[11px]
                                      text-[#77716B]
                                    "
                                  >
                                    <Check
                                      size={11}
                                      strokeWidth={2}
                                      className="
                                        text-[var(--secondary-color)]
                                      "
                                    />

                                    {skill}
                                  </span>
                                )
                              )}
                            </div>

                            {/* Bottom */}
                            <div
                              className="
                                mt-6
                                flex
                                items-center
                                justify-between
                                gap-8
                                border-t
                                border-[#E8E2DC]
                                pt-5
                              "
                            >
                              <div>
                                <span
                                  className="
                                    block
                                    text-2xl
                                    font-bold
                                    leading-none
                                    text-[var(--main-color)]
                                    sm:text-3xl
                                  "
                                >
                                  {path.coursesCount}
                                </span>

                                <span
                                  className="
                                    mt-1
                                    block
                                    text-[11px]
                                    text-[#77716B]
                                  "
                                >
                                  Courses
                                </span>
                              </div>

                              <div
                                className="
                                  flex
                                  h-11
                                  w-11
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-[#D8D1CA]
                                  bg-white
                                  transition-all
                                  duration-500
                                  group-hover:translate-x-1
                                  group-hover:border-[var(--secondary-color)]
                                  group-hover:bg-[var(--secondary-color)]
                                  group-hover:text-white
                                  sm:h-12
                                  sm:w-12
                                "
                              >
                                <ArrowRight
                                  size={17}
                                  strokeWidth={1.8}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Accent */}
                          <div
                            className="
                              absolute
                              bottom-0
                              left-0
                              h-[2px]
                              w-0
                              bg-[var(--secondary-color)]
                              transition-all
                              duration-700
                              group-hover:w-full
                            "
                          />
                        </article>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* =================================================
                  FINISH
              ================================================== */}
              <div
                className={`
                  relative
                  z-20
                  mt-8
                  flex
                  items-center
                  gap-4
                  transition-all
                  duration-700
                  ${
                    visible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: "1200ms",
                }}
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-[5px]
                    border-[#F7F5F2]
                    bg-[var(--secondary-color)]
                    text-white
                    shadow-lg
                  "
                >
                  <Flag
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="text-left">
                  <span
                    className="
                      block
                      text-sm
                      font-semibold
                      text-[var(--main-color)]
                    "
                  >
                    Keep Going
                  </span>

                  <span
                    className="
                      text-xs
                      text-[#77716B]
                    "
                  >
                    Your next destination awaits.
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* =====================================================
            BOTTOM MESSAGE
        ====================================================== */}
        {!loading &&
          !error &&
          paths.length > 0 && (
            <div
              className={`
                mt-12
                flex
                items-center
                justify-center
                gap-3
                text-center
                text-xs
                text-[#8A827A]
                transition-all
                duration-700
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: "1400ms",
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

              <span className="uppercase tracking-[0.12em]">
                Choose Your Destination
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

export default LearningPaths;