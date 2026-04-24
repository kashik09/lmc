"use client";
// CLIENT: form state + validation + doctor filtering + redirect

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  appointmentDepartments,
  sexOptions,
  patientTypeOptions,
} from "@/content/appointments";
import { doctors } from "@/content/doctors";
import { submitAppointment } from "@/lib/actions/appointment";
import { DatePickerField } from "@/components/ui/date-picker-field";

interface FormData {
  department: string;
  doctorSlug: string;
  fullName: string;
  patientType: string;
  dateOfBirth: string;
  sex: string;
  phone: string;
  email: string;
  appointmentDate: string;
  message: string;
}

const initialFormData: FormData = {
  department: "",
  doctorSlug: "",
  fullName: "",
  patientType: "",
  dateOfBirth: "",
  sex: "",
  phone: "",
  email: "",
  appointmentDate: "",
  message: "",
};

export function AppointmentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter doctors by selected department
  const filteredDoctors = useMemo(() => {
    if (!formData.department) return doctors;
    return doctors.filter((doc) => doc.department === formData.department);
  }, [formData.department]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    // Reset doctor selection when department changes
    if (name === "department") {
      setFormData((prev) => ({ ...prev, department: value, doctorSlug: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (globalError) {
      setGlobalError(null);
    }
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!formData.department) newErrors.department = "Required";
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.patientType) newErrors.patientType = "Required";
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
    setGlobalError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    const result = await submitAppointment(formData);

    if (result.success) {
      router.push(`/thank-you?ref=${result.referenceNumber}&type=appointment`);
      return;
    }

    setIsSubmitting(false);

    if (result.error === "validation") {
      const serverErrors: Partial<FormData> = {};
      for (const [key, messages] of Object.entries(result.errors)) {
        serverErrors[key as keyof FormData] = messages[0];
      }
      setErrors(serverErrors);
    } else if (result.error === "rate_limit" || result.error === "database") {
      setGlobalError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Global Error (rate limit / database) */}
      {globalError && (
        <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          {globalError}
        </div>
      )}

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

      {/* Preferred Doctor */}
      <div>
        <label
          htmlFor="doctorSlug"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Preferred Doctor{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <select
          id="doctorSlug"
          name="doctorSlug"
          value={formData.doctorSlug}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">No preference</option>
          {filteredDoctors.map((doc) => (
            <option key={doc.slug} value={doc.slug}>
              {doc.name}
            </option>
          ))}
        </select>
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

      {/* Patient Type */}
      <fieldset>
        <legend className="sr-only">
          Patient Type (required)
        </legend>
        <div className="flex gap-4">
          {patientTypeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="patientType"
                value={opt.value}
                checked={formData.patientType === opt.value}
                onChange={handleChange}
                className="h-4 w-4 border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.patientType && (
          <p className="mt-1 text-sm text-destructive">{errors.patientType}</p>
        )}
      </fieldset>

      {/* Date of Birth */}
      <DatePickerField
        label="Date of Birth"
        required
        value={formData.dateOfBirth}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, dateOfBirth: val }));
          if (errors.dateOfBirth) {
            setErrors((prev) => ({ ...prev, dateOfBirth: undefined }));
          }
          if (globalError) {
            setGlobalError(null);
          }
        }}
        error={errors.dateOfBirth}
        dateRules="past-only"
        placeholder="Select date of birth"
      />

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
      <DatePickerField
        label="Appointment Date"
        required
        value={formData.appointmentDate}
        onChange={(val) => {
          setFormData((prev) => ({ ...prev, appointmentDate: val }));
          if (errors.appointmentDate) {
            setErrors((prev) => ({ ...prev, appointmentDate: undefined }));
          }
          if (globalError) {
            setGlobalError(null);
          }
        }}
        error={errors.appointmentDate}
        dateRules="future-only"
        placeholder="Select appointment date"
      />

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
