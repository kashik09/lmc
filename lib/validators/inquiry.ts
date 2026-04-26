import { z } from "zod";

const phoneRegex = /^(\+?256|0)?[37]\d{8}$/;

// Same as contact schema for now
export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/[\s\-()]/g, ""))
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid Ugandan phone number",
    }),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200, "Subject must be less than 200 characters").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
