import { z } from "zod";

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
    .regex(phoneRegex, "Please enter a valid Ugandan phone number"),
  email: z.string().email("Please enter a valid email address"),
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
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
