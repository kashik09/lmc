"use client";
// CLIENT: form state + validation + doctor filtering + redirect

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, AlertCircle } from "lucide-react";
import {
  appointmentDepartments,
  sexOptions,
  patientTypeOptions,
} from "@/content/appointments";
import { submitAppointment } from "@/lib/actions/appointment";

type Doctor = {
  id: string;
  name: string;
  department: string;
  departmentName: string;
};
import { DatePickerField } from "@/components/ui/date-picker-field";
import { Button } from "@/components/ui/Button";
import {
  inputClass,
  selectClass,
  textareaClass,
  labelClass,
  errorClass,
  fieldWrapperClass,
  globalErrorClass,
} from "@/components/ui/FormField";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Fetch doctors from Supabase on mount
  useEffect(() => {
    fetch("/api/roster/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data.doctors || []);
        setLoadingDoctors(false);
      })
      .catch(() => {
        setLoadingDoctors(false);
      });
  }, []);

  // Filter doctors by selected department
  const filteredDoctors = useMemo(() => {
    if (!formData.department) return doctors;
    return doctors.filter((doc) => doc.department === formData.department);
  }, [formData.department, doctors]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    // Reset doctor selection when department changes
    if (name === "department") {
      setFormData((prev) => ({ ...prev, department: value, doctorSlug: "" }));
    } else if (name === "patientType") {
      // Reset DOB when patient type changes so calendar shows appropriate default
      setFormData((prev) => ({ ...prev, patientType: value, dateOfBirth: "" }));
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
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

    const result = await submitAppointment({ ...formData, turnstileToken });

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
    } else if (result.error === "captcha_failed") {
      setGlobalError(
        "Captcha verification failed. Please refresh the page and try again."
      );
    } else if (result.error === "rate_limit" || result.error === "database") {
      setGlobalError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1" aria-label="Appointment booking form">
      {/* Global Error (rate limit / database) */}
      {globalError && (
        <div className={globalErrorClass}>
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Department */}
      <div className={fieldWrapperClass}>
        <label htmlFor="department" className={labelClass}>
          Department <span className="text-red-500">*</span>
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.department}
          aria-describedby={errors.department ? "department-error" : undefined}
          className={selectClass}
        >
          <option value="">Select department</option>
          {appointmentDepartments.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>
        {errors.department && (
          <p id="department-error" className={errorClass}>{errors.department}</p>
        )}
      </div>

      {/* Preferred Doctor */}
      <div className={fieldWrapperClass}>
        <label htmlFor="doctorSlug" className={labelClass}>
          Preferred Doctor <span className="text-lmc-grayMedium font-normal">(optional)</span>
        </label>
        <select
          id="doctorSlug"
          name="doctorSlug"
          value={formData.doctorSlug}
          onChange={handleChange}
          className={selectClass}
          disabled={loadingDoctors}
          aria-busy={loadingDoctors}
        >
          <option value="">
            {loadingDoctors ? "Loading doctors..." : "No preference"}
          </option>
          {filteredDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Full Name */}
      <div className={fieldWrapperClass}>
        <label htmlFor="fullName" className={labelClass}>
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={inputClass}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p id="fullName-error" className={errorClass}>{errors.fullName}</p>
        )}
      </div>

      {/* Patient Type */}
      <fieldset className={fieldWrapperClass}>
        <legend className={labelClass}>
          Patient Type <span className="text-red-500">*</span>
        </legend>
        <div className="flex gap-4">
          {patientTypeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="patientType"
                value={opt.value}
                checked={formData.patientType === opt.value}
                onChange={handleChange}
                className="h-4 w-4 border-lmc-grayLight text-lmc-green focus:ring-lmc-green"
              />
              <span className="text-sm text-lmc-grayDark">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.patientType && (
          <p id="patientType-error" className={errorClass}>{errors.patientType}</p>
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
        defaultMonth={
          formData.patientType === "child"
            ? new Date(new Date().getFullYear() - 10, 0, 1)
            : new Date(new Date().getFullYear() - 30, 0, 1)
        }
        placeholder="Select date of birth"
      />

      {/* Sex */}
      <div className={fieldWrapperClass}>
        <label htmlFor="sex" className={labelClass}>
          Sex <span className="text-red-500">*</span>
        </label>
        <select
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.sex}
          aria-describedby={errors.sex ? "sex-error" : undefined}
          className={selectClass}
        >
          <option value="">Select</option>
          {sexOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.sex && (
          <p id="sex-error" className={errorClass}>{errors.sex}</p>
        )}
      </div>

      {/* Phone */}
      <div className={fieldWrapperClass}>
        <label htmlFor="phone" className={labelClass}>
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={inputClass}
          placeholder="+256 7XX XXX XXX"
        />
        {errors.phone && (
          <p id="phone-error" className={errorClass}>{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div className={fieldWrapperClass}>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-lmc-grayMedium font-normal">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>{errors.email}</p>
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
      <div className={fieldWrapperClass}>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-lmc-grayMedium font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={textareaClass}
          placeholder="Any additional information..."
        />
      </div>

      {/* Turnstile Captcha */}
      <div className="flex justify-center py-2">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
          options={{ theme: "light", size: "normal" }}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        size="lg"
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : !turnstileToken ? (
          "Verifying..."
        ) : (
          "Book Appointment"
        )}
      </Button>
    </form>
  );
}
