import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import {
  contactSchema,
  type ContactSchemaData,
} from "../../schemas/contactSchema";

const API_URL = `${import.meta.env.VITE_API_URL}/api/contacts`;

const ContactForm = () => {
  const { t, i18n } = useTranslation();

  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const messageTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Create the schema using the current language
  const schema = useMemo(
    () => contactSchema(t),
    [t, i18n.language]
  );

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactSchemaData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  /*
   * Keep the latest errors in a ref.
   * This allows us to check whether there are
   * validation errors without putting `errors`
   * inside the language-change effect dependencies.
   */
  const errorsRef = useRef(errors);

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  /*
   * Re-validate only when the language changes.
   *
   * If the user already has validation errors,
   * they will immediately be translated without
   * requiring another submit.
   */
  useEffect(() => {
    if (Object.keys(errorsRef.current).length > 0) {
      void trigger();
    }
  }, [i18n.language, trigger]);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  const onSubmit: SubmitHandler<ContactSchemaData> = async (
    data
  ) => {
    // Clear previous messages
    setServerMessage("");
    setServerError("");

    // Clear previous timer
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    try {
      const response = await axios.post(
        API_URL,
        data
      );

      if (response.data.success) {
        setServerMessage(
          t("contact.form.success")
        );

        reset();

        // Hide success message after 7 seconds
        messageTimerRef.current = setTimeout(() => {
          setServerMessage("");
        }, 7000);
      }
    } catch (error) {
      let message = t("contact.form.error");

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          message;
      }

      setServerError(message);

      // Hide error message after 7 seconds
      messageTimerRef.current = setTimeout(() => {
        setServerError("");
      }, 7000);
    }
  };

  /*
   * Keep this wrapper because passing
   * handleSubmit(onSubmit) directly to onSubmit
   * can trigger the React hooks/refs ESLint rule.
   */
  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <section
      id="contact-form"
      className="bg-[var(--background)] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.18em] text-[var(--primary-color)]">
            {t("contact.form.badge")}
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-[var(--main-color)] sm:text-4xl">
            {t("contact.form.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#77716b] sm:text-base">
            {t("contact.form.description")}
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="rounded-[28px] border border-[#e4ded8] bg-white/60 p-6 shadow-sm backdrop-blur-md sm:p-8"
        >

          {/* ================= NAME ================= */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              {t("contact.form.name")}
            </label>

            <input
              id="name"
              type="text"
              placeholder={t(
                "contact.form.namePlaceholder"
              )}
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

          {/* ================= EMAIL ================= */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              {t("contact.form.email")}
            </label>

            <input
              id="email"
              type="email"
              placeholder={t(
                "contact.form.emailPlaceholder"
              )}
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

          {/* ================= SUBJECT ================= */}
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-[var(--main-color)]"
            >
              {t("contact.form.subject")}
            </label>

            <input
              id="subject"
              type="text"
              placeholder={t(
                "contact.form.subjectPlaceholder"
              )}
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

          {/* ================= MESSAGE ================= */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--main-color)]"
              >
                {t("contact.form.message")}
              </label>

              <span className="text-xs text-[#8a827a]">
                {t("contact.form.maxCharacters")}
              </span>
            </div>

            <textarea
              id="message"
              rows={6}
              maxLength={1000}
              placeholder={t(
                "contact.form.messagePlaceholder"
              )}
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

          {/* ================= SUCCESS MESSAGE ================= */}
          {serverMessage && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {serverMessage}
            </div>
          )}

          {/* ================= ERROR MESSAGE ================= */}
          {serverError && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          {/* ================= SUBMIT ================= */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[var(--primary-color)] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? t("contact.form.sending")
              : t("contact.form.send")}
          </button>

        </form>
      </div>
    </section>
  );
};

export default ContactForm;