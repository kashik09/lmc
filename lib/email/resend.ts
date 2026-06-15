import { Resend } from "resend";

/**
 * Resend email client
 *
 * Configure RESEND_API_KEY in .env.local
 * During development without a verified domain, emails come from onboarding@resend.dev
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender - update to your domain once verified
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "Lifeline Medical Centre <onboarding@resend.dev>";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, from = DEFAULT_FROM, replyTo } = options;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[email] Failed to send:", err);
    return { success: false, error: "Failed to send email" };
  }
}

export { resend };
