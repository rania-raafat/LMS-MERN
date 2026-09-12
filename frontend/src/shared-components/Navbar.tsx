import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../assets/images/lms-logo.webp";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Courses",
    path: "/courses",
  },
  {
    label: "Learning Paths",
    path: "/learning-paths",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close sidebar with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu after clicking a link
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-4 left-0 right-0 z-50">
        <div
          className={`
            mx-auto
            max-w-7xl
            rounded-full
            border
            border-[#d8d1ca]
            px-6
            py-4
            transition-all
            duration-300
            ${
              scrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5"
                : "bg-white backdrop-blur-md"
            }
          `}
        >
          <nav className="flex items-center justify-between">
            {/* ================= LOGO ================= */}
            <Link to="/" className="flex shrink-0 items-center gap-3">
              <img
                src={logo}
                alt="LMS Logo"
                className="h-10 w-auto object-contain"
              />

              <span className="text-xl font-bold tracking-tight text-[var(--main-color)]">
                LMS
              </span>
            </Link>

            {/* ================= DESKTOP NAVIGATION ================= */}
            <div className="hidden items-center gap-7 md:flex lg:gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="
                    group
                    relative
                    h-6
                    overflow-hidden
                    text-sm
                    font-medium
                    text-[var(--main-color)]
                  "
                >
                  {/* Default text */}
                  <span
                    className="
                      block
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:-translate-y-full
                    "
                  >
                    {link.label}
                  </span>

                  {/* Hover text */}
                  <span
                    className="
                      absolute
                      left-0
                      top-full
                      block
                      text-[var(--primary-color)]
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:-translate-y-full
                    "
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* ================= DESKTOP ACTIONS ================= */}
            <div className="hidden items-center gap-3 md:flex">
              {/* Login */}
              <Link
                to="/login"
                className="
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[var(--main-color)]
                  transition
                  hover:bg-white/70
                "
              >
                Login
              </Link>

              {/* CTA */}
              <Link
                to="/register"
                className="
                  rounded-full
                  bg-[var(--primary-color)]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-lg
                  hover:shadow-[#D97B66]/20
                "
              >
                Start Learning
              </Link>
            </div>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="
                flex
                items-center
                justify-center
                rounded-full
                p-2
                text-[#292725]
                transition
                hover:bg-white/70
                md:hidden
              "
            >
              <Menu size={25} strokeWidth={1.8} />
            </button>
          </nav>
        </div>
      </header>

      {/* ================= BACKDROP ================= */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/30
          backdrop-blur-[2px]
          transition-all
          duration-300
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        aria-label="Mobile navigation"
        className={`
          fixed
          top-0
          right-0
          z-[70]
          flex
          h-screen
          w-[min(85vw,340px)]
          flex-col
          bg-[#F7F5F2]
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ================= SIDEBAR HEADER ================= */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[#e4ded8]
            px-5
            py-5
          "
        >
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="LMS Logo"
              className="h-9 w-auto object-contain"
            />

            <span className="text-lg font-bold text-[#292725]">LMS</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#d8d1ca]
              text-[#292725]
              transition
              hover:bg-white
            "
          >
            <X size={21} strokeWidth={1.8} />
          </button>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div
          className="
            flex-1
            overflow-y-auto
            overscroll-contain
            px-5
            py-5
            scrollbar-thin
          "
        >
          {/* Navigation Links */}
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className="
                  border-b
                  border-[#e8e2dc]
                  py-4
                  text-base
                  font-medium
                  text-[#292725]
                  transition-colors
                  hover:text-[var(--primary-color)]
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8a827a]">
              Account
            </p>

            <div className="flex flex-col gap-3">
              {/* Login */}
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="
                  rounded-full
                  border
                  border-[#d8d1ca]
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-[#292725]
                  transition
                  hover:bg-white
                "
              >
                Login
              </Link>

              {/* CTA */}
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="
                  rounded-full
                  bg-[var(--primary-color)]
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#be553e]
                "
              >
                Start Learning
              </Link>
            </div>
          </div>

          {/* Small Description */}
          <div className="mt-10 rounded-2xl bg-white/60 p-5">
            <p className="text-sm leading-6 text-[#77716b]">
              Learn practical skills, build real projects, and grow with
              confidence through structured learning.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
