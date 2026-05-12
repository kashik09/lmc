"use client";
// CLIENT: form state + validation + redirect

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { contactForm } from "@/content/contacts";
import { submitContact } from "@/lib/actions/contact";
import { Button } from "@/components/ui/Button";
import {
  inputClass,
  textareaClass,
  labelClass,
  errorClass,
  fieldWrapperClass,
  globalErrorClass,
} from "@/components/ui/FormField";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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

    const result = await submitContact({ ...formData, turnstileToken });

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
    } else if (result.error === "captcha_failed") {
      setGlobalError(
        "Captcha verification failed. Please refresh the page and try again."
      );
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
    <form onSubmit={handleSubmit} className="space-y-1" aria-label="Contact form">
      {/* Global Error (rate limit / database) */}
      {globalError && (
        <div className={globalErrorClass}>
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Full Name */}
      <div className={fieldWrapperClass}>
        <label htmlFor="fullName" className={labelClass}>
          {contactForm.fields.fullName.label}
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={contactForm.fields.fullName.placeholder}
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={inputClass}
        />
        {errors.fullName && (
          <p id="fullName-error" className={errorClass}>{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div className={fieldWrapperClass}>
        <label htmlFor="phone" className={labelClass}>
          {contactForm.fields.phone.label}
          <span className="text-red-500"> *</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={contactForm.fields.phone.placeholder}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={inputClass}
        />
        {errors.phone && (
          <p id="phone-error" className={errorClass}>{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div className={fieldWrapperClass}>
        <label htmlFor="email" className={labelClass}>
          {contactForm.fields.email.label}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={contactForm.fields.email.placeholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>{errors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div className={fieldWrapperClass}>
        <label htmlFor="subject" className={labelClass}>
          {contactForm.fields.subject.label}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={contactForm.fields.subject.placeholder}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className={fieldWrapperClass}>
        <label htmlFor="message" className={labelClass}>
          {contactForm.fields.message.label}
          <span className="text-red-500"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={contactForm.fields.message.placeholder}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={textareaClass}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>{errors.message}</p>
        )}
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
            Sending...
          </>
        ) : !turnstileToken ? (
          "Verifying..."
        ) : (
          <>
            {contactForm.submitButton}
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
