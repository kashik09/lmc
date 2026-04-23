"use client";
// CLIENT: form state + validation

import { useState } from "react";
import {
  appointmentDepartments,
  sexOptions,
} from "@/content/appointments";
import { submitAppointment } from "@/lib/actions/appointment";

interface FormData {
  department: string;
  fullName: string;
  dateOfBirth: string;
  sex: string;
  phone: string;
  email: string;
  appointmentDate: string;
  message: string;
}

const initialFormData: FormData = {
  department: "",
  fullName: "",
  dateOfBirth: "",
  sex: "",
  phone: "",
  email: "",
  appointmentDate: "",
  message: "",
};

export function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!formData.department) newErrors.department = "Required";
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required";
    if (!formData.sex) newErrors.sex = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.appointmentDate) newErrors.appointmentDate = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const result = await submitAppointment(formData);

    if (!result.success) {
      // Map server errors to form errors
      const serverErrors: Partial<FormData> = {};
      for (const [key, messages] of Object.entries(result.errors)) {
        serverErrors[key as keyof FormData] = messages[0];
      }
      setErrors(serverErrors);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData(initialFormData);
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
          Appointment Request Sent
        </h3>
        <p className="mb-4 text-muted-foreground">
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm font-medium text-primary hover:underline"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Department */}
      <div>
        <label
          htmlFor="department"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Department <span className="text-destructive">*</span>
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.department ? "border-destructive" : "border-input"
          }`}
        >
          <option value="">Select department</option>
          {appointmentDepartments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="mt-1 text-sm text-destructive">{errors.department}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Full Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.fullName ? "border-destructive" : "border-input"
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label
          htmlFor="dateOfBirth"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Date of Birth <span className="text-destructive">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.dateOfBirth ? "border-destructive" : "border-input"
          }`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-destructive">{errors.dateOfBirth}</p>
        )}
      </div>

      {/* Sex */}
      <div>
        <label
          htmlFor="sex"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Sex <span className="text-destructive">*</span>
        </label>
        <select
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.sex ? "border-destructive" : "border-input"
          }`}
        >
          <option value="">Select</option>
          {sexOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.sex && (
          <p className="mt-1 text-sm text-destructive">{errors.sex}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Phone Number <span className="text-destructive">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.phone ? "border-destructive" : "border-input"
          }`}
          placeholder="+256 7XX XXX XXX"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.email ? "border-destructive" : "border-input"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Appointment Date */}
      <div>
        <label
          htmlFor="appointmentDate"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Appointment Date <span className="text-destructive">*</span>
        </label>
        <input
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.appointmentDate ? "border-destructive" : "border-input"
          }`}
        />
        {errors.appointmentDate && (
          <p className="mt-1 text-sm text-destructive">
            {errors.appointmentDate}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Message <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Any additional information..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
}
