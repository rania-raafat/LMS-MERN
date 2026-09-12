import { z } from "zod";

export const contactSchema = () =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(
        /^[\p{L}\p{M}\s'-]+$/u,
        "Name can only contain letters, spaces, apostrophes, and hyphens",
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(254, "Email must not exceed 254 characters"),

    subject: z
      .string()
      .trim()
      .min(1, "Subject is required")
      .min(3, "Subject must be at least 3 characters")
      .max(100, "Subject must not exceed 100 characters"),

    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must not exceed 1000 characters"),
  });

export type ContactSchemaData = z.infer<ReturnType<typeof contactSchema>>;
