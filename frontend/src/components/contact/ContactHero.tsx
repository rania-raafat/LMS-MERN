import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import contactHeroImage from "../../assets/images/contact-hero.jpeg";
import { useReveal } from "../../hooks/useReveal";

const ContactHero = () => {
  const { ref: heroRef, visible } = useReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-35 pb-15 sm:pt-35 sm:pb-18"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0">
        <img
          src={contactHeroImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        {/* Main Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Soft Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8">
        <div className="max-w-3xl">

          {/* ================= BADGE ================= */}
          <div
            className={`
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/30
              bg-white/15
              px-3.5
              py-2
              text-xs
              text-white
              backdrop-blur-md
              sm:mb-6
              sm:px-4
              sm:text-sm
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
            <span className="h-2 w-2 rounded-full bg-[var(--primary-color)]" />

            <span className="font-medium uppercase tracking-[0.16em]">
              {t("contact.hero.badge")}
            </span>
          </div>

          {/* ================= HEADING ================= */}
          <h1
            className={`
              text-4xl
              font-bold
              leading-[1.1]
              tracking-tight
              text-white
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
            {t("contact.hero.title")}
            <br />

            <span className="text-[var(--primary-color)]">
              {t("contact.hero.titleHighlight")}
            </span>
          </h1>

          {/* ================= DESCRIPTION ================= */}
          <p
            className={`
              mt-5
              max-w-xl
              text-base
              leading-7
              text-white/85
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
            {t("contact.hero.description")}
          </p>

          {/* ================= BUTTON ================= */}
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
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <a
              href="#contact-form"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[var(--primary-color)]
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-black/20
                sm:px-6
                sm:text-base
              "
            >
              {t("contact.hero.button")}

              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* ================= TRUST MESSAGE ================= */}
          <div
            className={`
              mt-8
              flex
              items-center
              gap-3
              text-sm
              text-white/75
              transition-all
              duration-1000
              delay-500
              ease-out
              sm:mt-10
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <span className="h-px w-8 bg-white/40" />

            <span>
              {t("contact.hero.trust")}
            </span>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM INDICATOR ================= */}
      <div
        className={`
          absolute
          bottom-8
          left-1/2
          hidden
          -translate-x-1/2
          transition-all
          duration-1000
          delay-700
          sm:block
          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }
        `}
      >
        <div className="h-10 w-px bg-white/40" />
      </div>
    </section>
  );
};

export default ContactHero;