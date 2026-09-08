import type { TFunction } from "i18next";
import { z } from "zod";

export const contactSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t("contact.validation.nameRequired"))
      .min(2, t("contact.validation.nameMin"))
      .max(50, t("contact.validation.nameMax"))
      .regex(
        /^[\p{L}\p{M}\s'-]+$/u,
        t("contact.validation.nameInvalid")
      ),

    email: z
      .string()
      .trim()
      .min(1, t("contact.validation.emailRequired"))
      .email(t("contact.validation.emailInvalid"))
      .max(254, t("contact.validation.emailMax")),

    subject: z
      .string()
      .trim()
      .min(1, t("contact.validation.subjectRequired"))
      .min(3, t("contact.validation.subjectMin"))
      .max(100, t("contact.validation.subjectMax")),

    message: z
      .string()
      .trim()
      .min(1, t("contact.validation.messageRequired"))
      .min(10, t("contact.validation.messageMin"))
      .max(1000, t("contact.validation.messageMax")),
  });

export type ContactSchemaData = z.infer<
  ReturnType<typeof contactSchema>
>;