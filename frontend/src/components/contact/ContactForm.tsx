import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactSchema,
  type ContactSchemaData,
} from "../../schemas/contactSchema";

import { createContact } from "../../services/contactApi";

// =====================================================
// CONTACT SCHEMA
// =====================================================

const schema = contactSchema();

// =====================================================
// COMPONENT
// =====================================================

const ContactForm = () => {
  // ===================================================
  // SERVER STATES
  // ===================================================

  const [serverMessage, setServerMessage] =
    useState("");

  const [serverError, setServerError] =
    useState("");

  // ===================================================
  // MESSAGE TIMER
  // ===================================================

  const messageTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  // ===================================================
  // REACT HOOK FORM
  // ===================================================

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactSchemaData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // ===================================================
  // CLEANUP TIMER
  // ===================================================

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  // ===================================================
  // SUBMIT
  // ===================================================

  const onSubmit: SubmitHandler<
    ContactSchemaData
  > = async (data) => {
    // -----------------------------------------------
    // Clear previous messages
    // -----------------------------------------------

    setServerMessage("");
    setServerError("");

    // -----------------------------------------------
    // Clear previous timer
    // -----------------------------------------------

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    // -----------------------------------------------
    // Send contact message
    // -----------------------------------------------

    try {
      await createContact({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      // ---------------------------------------------
      // Success
      // ---------------------------------------------

      setServerMessage(
        "Your message has been sent successfully. We will get back to you soon."
      );

      // ---------------------------------------------
      // Reset form
      // ---------------------------------------------

      reset();

      // ---------------------------------------------
      // Hide success message after 7 seconds
      // ---------------------------------------------

      messageTimerRef.current = setTimeout(() => {
        setServerMessage("");
      }, 7000);
    } catch (error) {
      // ---------------------------------------------
      // Default error message
      // ---------------------------------------------

      let message =
        "Something went wrong while sending your message. Please try again.";

      // ---------------------------------------------
      // API error
      // ---------------------------------------------

      if (error instanceof Error && error.message) {
        message = error.message;
      }

      setServerError(message);

      // ---------------------------------------------
      // Hide error message after 7 seconds
      // ---------------------------------------------

      messageTimerRef.current = setTimeout(() => {
        setServerError("");
      }, 7000);
    }
  };

  // ===================================================
  // FORM SUBMIT WRAPPER
  // ===================================================

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    void handleSubmit(onSubmit)(event);
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <section
      id="contact-form"
      className="bg-[var(--background)] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.18em] text-[var(--primary-color)]">
            Get In Touch
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-[var(--main-color)] sm:text-4xl">
            Let&apos;s Start a Conversation
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#77716b] sm:text-base">
            Have a question, idea, or project in mind?
            Send us a message and we&apos;ll get back to
            you as soon as possible.
          </p>
        </div>

        {/* =========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="rounded-[28px] border border-[#e4ded8] bg-white/60 p-6 shadow-sm backdrop-blur-md sm:p-8"
        >

          {/* =======================================
              NAME
          ======================================== */}

          <div className="mb-6">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              {...register("name")}
              className={`w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-sm text-[var(--main-color)] outline-none transition placeholder:text-[#a49d96] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/10 ${
                errors.name
                  ? "border-red-400"
                  : "border-[#e4ded8]"
              }`}
            />

            {errors.name && (
              <p className="mt-2 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* =======================================
              EMAIL
          ======================================== */}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-sm text-[var(--main-color)] outline-none transition placeholder:text-[#a49d96] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/10 ${
                errors.email
                  ? "border-red-400"
                  : "border-[#e4ded8]"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* =======================================
              SUBJECT
          ======================================== */}

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="What would you like to talk about?"
              {...register("subject")}
              className={`w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-sm text-[var(--main-color)] outline-none transition placeholder:text-[#a49d96] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/10 ${
                errors.subject
                  ? "border-red-400"
                  : "border-[#e4ded8]"
              }`}
            />

            {errors.subject && (
              <p className="mt-2 text-xs text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* =======================================
              MESSAGE
          ======================================== */}

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--main-color)]"
              >
                Message
              </label>

              <span className="text-xs text-[#8a827a]">
                Maximum 1000 characters
              </span>
            </div>

            <textarea
              id="message"
              rows={6}
              maxLength={1000}
              placeholder="Write your message here..."
              {...register("message")}
              className={`w-full resize-none rounded-2xl border bg-white/70 px-4 py-3.5 text-sm text-[var(--main-color)] outline-none transition placeholder:text-[#a49d96] focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/10 ${
                errors.message
                  ? "border-red-400"
                  : "border-[#e4ded8]"
              }`}
            />

            {errors.message && (
              <p className="mt-2 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* =======================================
              SUCCESS MESSAGE
          ======================================== */}

          {serverMessage && (
            <div
              role="status"
              aria-live="polite"
              className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {serverMessage}
            </div>
          )}

          {/* =======================================
              ERROR MESSAGE
          ======================================== */}

          {serverError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {serverError}
            </div>
          )}

          {/* =======================================
              SUBMIT
          ======================================== */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[var(--primary-color)] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Sending..."
              : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;