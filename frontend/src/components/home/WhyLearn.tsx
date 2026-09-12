import {
  BookOpen,
  Layers3,
  UsersRound,
} from "lucide-react";

import { useReveal } from "../../hooks/useReveal";

const WhyLearn = () => {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  const features = [
    {
      icon: BookOpen,
      title: "Practical Learning",
      description:
        "Learn through practical concepts, real-world examples, and hands-on experiences that help you turn knowledge into useful skills.",
    },
    {
      icon: Layers3,
      title: "Structured Learning",
      description:
        "Follow clear and organized learning paths designed to help you build your skills step by step and progress with confidence.",
    },
    {
      icon: UsersRound,
      title: "Expert Guidance",
      description:
        "Learn from experienced instructors and gain guidance that helps you understand concepts, solve problems, and build better projects.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5F2] py-20 sm:py-24 lg:py-28"
    >
      {/* Professional Section Separator */}
      <div className="absolute left-1/2 top-0 w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-8">
        <div className="h-px w-full bg-[#D8D1CA]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* SECTION HEADING */}
        <div
          className={`
            mx-auto max-w-2xl text-center
            transition-all duration-1000 ease-out
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          {/* Badge */}
          <span
            className="
              inline-flex items-center rounded-full
              border border-[#D8D1CA]
              bg-white/60
              px-4 py-2
              text-xs text-[#77716B]
              sm:text-sm
            "
          >
            Why Learn With Us
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#292725] sm:text-4xl lg:text-5xl">
            Learn With Purpose
            <br className="hidden sm:block" />
            Build With Confidence
          </h2>

          {/* Description */}
          <p className="mt-5 text-base leading-7 text-[#77716B] sm:text-lg">
            Build practical skills through structured learning, real-world
            projects, and guidance designed to help you grow professionally.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`
                  group rounded-[24px]
                  border border-[#D8D1CA]
                  bg-white/55
                  p-6 sm:p-7
                  transition-all duration-700 ease-out
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                  hover:shadow-black/5
                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${250 + index * 150}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-2xl
                    bg-[var(--main-color)]
                    text-white
                    transition-all duration-500
                    group-hover:scale-105
                    group-hover:rotate-1
                  "
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[var(--main-color)]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#77716B] sm:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div
                  className="
                    mt-7 h-px w-10
                    bg-[var(--primary-color)]
                    transition-all duration-500
                    group-hover:w-16
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLearn;