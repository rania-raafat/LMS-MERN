import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useReveal } from "../hooks/useReveal";
import Logo from "../assets/images/lms-logo.webp";

const Footer = () => {
  const { ref: footerRef, visible } = useReveal<HTMLElement>();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[var(--background)]"
    >
      {/* TOP SEPARATOR */}
      <div className="absolute left-1/2 top-0 w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-8">
        <div className="h-px w-full bg-[#D8D1CA]" />
      </div>

      {/* BACKGROUND GLOW */}
      <div
        className={`pointer-events-none absolute -right-40 top-16 h-80 w-80 rounded-full bg-[var(--primary-color)] blur-3xl transition-all duration-[1500ms] ${
          visible ? "scale-100 opacity-[0.05]" : "scale-50 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-[var(--secondary-color)] blur-3xl transition-all duration-[1500ms] ${
          visible ? "scale-100 opacity-[0.04]" : "scale-50 opacity-0"
        }`}
      />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-8">
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* FOOTER GRID */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
            {/* BRAND */}
            <div className="max-w-sm">
              <Link
                to="/"
                aria-label="LMS Home"
                className="group inline-flex items-center"
              >
                <img
                  src={Logo}
                  alt="LMS"
                  className="
                    h-12
                    w-auto
                    max-w-[180px]
                    object-contain
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

              <p className="mt-6 max-w-xs text-sm leading-7 text-[var(--main-color)]/55">
                Learn practical skills, build real projects, and grow with
                confidence through structured learning.
              </p>

              {/* SOCIAL ICONS */}
              <div className="mt-7 flex items-center gap-2.5">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    border border-[#D8D1CA] bg-white
                    text-[var(--main-color)]/60
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[var(--primary-color)]
                    hover:text-[var(--primary-color)]
                    hover:shadow-md
                  "
                >
                  <FaLinkedin size={15} />
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    border border-[#D8D1CA] bg-white
                    text-[var(--main-color)]/60
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[var(--primary-color)]
                    hover:text-[var(--primary-color)]
                    hover:shadow-md
                  "
                >
                  <FaGithub size={15} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    flex h-9 w-9 items-center justify-center rounded-full
                    border border-[#D8D1CA] bg-white
                    text-[var(--main-color)]/60
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[var(--primary-color)]
                    hover:text-[var(--primary-color)]
                    hover:shadow-md
                  "
                >
                  <FaInstagram size={15} />
                </a>
              </div>
            </div>

            {/* PLATFORM */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--main-color)]">
                Platform
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/courses"
                    className="text-sm text-[var(--main-color)]/55 transition-colors duration-300 hover:text-[var(--primary-color)]"
                  >
                    Courses
                  </Link>
                </li>

                <li>
                  <Link
                    to="/learning-paths"
                    className="text-sm text-[var(--main-color)]/55 transition-colors duration-300 hover:text-[var(--primary-color)]"
                  >
                    Learning Paths
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--main-color)]">
                Company
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-[var(--main-color)]/55 transition-colors duration-300 hover:text-[var(--primary-color)]"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-[var(--main-color)]/55 transition-colors duration-300 hover:text-[var(--primary-color)]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--main-color)]">
                Resources
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-1.5 text-sm text-[var(--main-color)]/55 transition-colors duration-300 hover:text-[var(--primary-color)]"
                  >
                    Start Learning
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px w-full bg-[#D8D1CA]" />

          {/* BOTTOM BAR */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[var(--main-color)]/40">
              © {new Date().getFullYear()} LMS. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--main-color)]/30">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-color)]" />

              <span className="uppercase tracking-[0.20em] text-black">
                Learn • Build • Grow
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
