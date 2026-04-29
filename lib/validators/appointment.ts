import { z } from "zod";
import { calculateAge, ADULT_AGE_THRESHOLD } from "@/lib/utils/age";

const phoneRegex = /^(\+?256|0)?[37]\d{8}$/;

export const appointmentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  doctorSlug: z.string().optional(),
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      return date < new Date();
    }, "Date of birth must be in the past"),
  patientType: z.enum(["adult", "child"], {
    message: "Please select patient type",
  }),
  sex: z.enum(["male", "female"], {
    message: "Please select a valid option",
  }),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/[\s\-()]/g, ""))
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid Ugandan phone number",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .or(z.literal("")),
  appointmentDate: z
    .string()
    .min(1, "Appointment date is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Appointment date cannot be in the past"),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
  turnstileToken: z.string().min(1, "Captcha verification required").nullable(),
}).superRefine((data, ctx) => {
  const age = calculateAge(data.dateOfBirth);

  if (data.patientType === "adult" && age < ADULT_AGE_THRESHOLD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dateOfBirth"],
      message: `An adult patient must be at least ${ADULT_AGE_THRESHOLD} years old. If the patient is younger, select "Child" above.`,
    });
  }

  if (data.patientType === "child" && age >= ADULT_AGE_THRESHOLD) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["patientType"],
      message: `Patients ${ADULT_AGE_THRESHOLD} and over should be marked as "Adult".`,
    });
  }

  // Validate sane DOB bounds
  if (age > 120) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dateOfBirth"],
      message: "Please check the date of birth — that's over 120 years ago.",
    });
  }
  if (age < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dateOfBirth"],
      message: "Date of birth cannot be in the future.",
    });
  }
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
