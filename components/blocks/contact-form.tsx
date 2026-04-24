"use client";
// CLIENT: form state + validation + redirect

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contactForm } from "@/content/contacts";
import { submitContact } from "@/lib/actions/contact";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const result = await submitContact(formData);

    if (result.success) {
      router.push(`/thank-you?ref=${result.referenceNumber}&type=inquiry`);
      return;
    }

    setIsSubmitting(false);

    if (result.error === "validation") {
      const serverErrors: FormErrors = {};
      for (const [key, messages] of Object.entries(result.errors)) {
        serverErrors[key as keyof FormErrors] = messages[0];
      }
      setErrors(serverErrors);
    } else if (result.error === "rate_limit" || result.error === "database") {
      setGlobalError(result.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (globalError) {
      setGlobalError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Global Error (rate limit / database) */}
      {globalError && (
        <div className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          {globalError}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {contactForm.fields.fullName.label}
          <span className="text-destructive"> *</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={contactForm.fields.fullName.placeholder}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.fullName ? "border-destructive" : "border-input"
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {contactForm.fields.phone.label}
          <span className="text-destructive"> *</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={contactForm.fields.phone.placeholder}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.phone ? "border-destructive" : "border-input"
          }`}
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
          {contactForm.fields.email.label}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={contactForm.fields.email.placeholder}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.email ? "border-destructive" : "border-input"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {contactForm.fields.subject.label}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={contactForm.fields.subject.placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {contactForm.fields.message.label}
          <span className="text-destructive"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={contactForm.fields.message.placeholder}
          className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            errors.message ? "border-destructive" : "border-input"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : contactForm.submitButton}
      </button>
    </form>
  );
}
