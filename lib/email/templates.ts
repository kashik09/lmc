/**
 * Email templates for Lifeline Medical Centre
 *
 * Simple HTML templates with inline styles for email compatibility.
 * Colors match LMC brand: green #1b7a12, blue #304770
 */

const BRAND_GREEN = "#1b7a12";
const BRAND_BLUE = "#304770";

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const buttonStyle = `
  display: inline-block;
  padding: 12px 24px;
  background-color: ${BRAND_GREEN};
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
`;

function wrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: white; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: ${BRAND_GREEN}; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">
                LIFELINE MEDICAL CENTRE
              </h1>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">
                Gayaza, Uganda
              </p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px; ${baseStyles}">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: ${BRAND_BLUE}; padding: 24px; text-align: center;">
              <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 13px;">
                Lifeline Medical Centre
              </p>
              <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 12px;">
                Gayaza-Zirobwe Road, Gayaza, Uganda<br>
                (+256) 751-873-951 | (+256) 774-202-747
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ============================================
// APPOINTMENT TEMPLATES
// ============================================

export interface AppointmentEmailData {
  patientName: string;
  referenceNumber: string;
  department: string;
  appointmentDate: string;
  phone: string;
  email?: string;
}

export function appointmentConfirmationEmail(data: AppointmentEmailData): string {
  const content = `
    <h2 style="margin: 0 0 16px; color: ${BRAND_GREEN}; font-size: 22px;">
      Appointment Request Received
    </h2>
    <p>Dear <strong>${data.patientName}</strong>,</p>
    <p>
      Thank you for requesting an appointment at Lifeline Medical Centre.
      We have received your request and will contact you shortly to confirm.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid ${BRAND_GREEN}; padding: 16px; margin: 24px 0;">
      <p style="margin: 0 0 8px;"><strong>Reference Number:</strong> ${data.referenceNumber}</p>
      <p style="margin: 0 0 8px;"><strong>Department:</strong> ${data.department}</p>
      <p style="margin: 0 0 8px;"><strong>Requested Date:</strong> ${data.appointmentDate}</p>
      <p style="margin: 0;"><strong>Contact:</strong> ${data.phone}</p>
    </div>

    <p style="color: #666; font-size: 14px;">
      <strong>What happens next?</strong><br>
      Our reception team will call you within 24 hours to confirm your appointment
      time and provide any preparation instructions.
    </p>

    <p style="color: #666; font-size: 14px;">
      If you need to reach us urgently, call our emergency line:<br>
      <strong style="color: ${BRAND_GREEN};">(+256) 774-202-747</strong>
    </p>
  `;
  return wrapper(content);
}

export function appointmentNotificationEmail(data: AppointmentEmailData): string {
  const content = `
    <h2 style="margin: 0 0 16px; color: ${BRAND_BLUE}; font-size: 22px;">
      New Appointment Request
    </h2>
    <p>A new appointment request has been submitted:</p>

    <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 140px; color: #666;">Reference</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${data.referenceNumber}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Patient Name</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.patientName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Department</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.department}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Requested Date</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.appointmentDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
          <a href="tel:${data.phone}" style="color: ${BRAND_GREEN};">${data.phone}</a>
        </td>
      </tr>
      ${data.email ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
          <a href="mailto:${data.email}" style="color: ${BRAND_GREEN};">${data.email}</a>
        </td>
      </tr>
      ` : ""}
    </table>

    <p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://lmc.co.ug"}/reception" style="${buttonStyle}">
        View in Reception
      </a>
    </p>
  `;
  return wrapper(content);
}

// ============================================
// CONTACT/INQUIRY TEMPLATES
// ============================================

export interface InquiryEmailData {
  name: string;
  referenceNumber: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function inquiryConfirmationEmail(data: InquiryEmailData): string {
  const content = `
    <h2 style="margin: 0 0 16px; color: ${BRAND_GREEN}; font-size: 22px;">
      We Received Your Message
    </h2>
    <p>Dear <strong>${data.name}</strong>,</p>
    <p>
      Thank you for contacting Lifeline Medical Centre. We have received your
      inquiry and will respond as soon as possible.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid ${BRAND_GREEN}; padding: 16px; margin: 24px 0;">
      <p style="margin: 0 0 8px;"><strong>Reference:</strong> ${data.referenceNumber}</p>
      ${data.subject ? `<p style="margin: 0 0 8px;"><strong>Subject:</strong> ${data.subject}</p>` : ""}
      <p style="margin: 0;"><strong>Your message:</strong></p>
      <p style="margin: 8px 0 0; color: #555; white-space: pre-wrap;">${data.message}</p>
    </div>

    <p style="color: #666; font-size: 14px;">
      For urgent medical matters, please call us directly:<br>
      <strong style="color: ${BRAND_GREEN};">(+256) 774-202-747</strong>
    </p>
  `;
  return wrapper(content);
}

export function inquiryNotificationEmail(data: InquiryEmailData): string {
  const content = `
    <h2 style="margin: 0 0 16px; color: ${BRAND_BLUE}; font-size: 22px;">
      New Contact Form Submission
    </h2>
    <p>A visitor has submitted the contact form:</p>

    <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 120px; color: #666;">Reference</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">${data.referenceNumber}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Name</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
          <a href="mailto:${data.email}" style="color: ${BRAND_GREEN};">${data.email}</a>
        </td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
          <a href="tel:${data.phone}" style="color: ${BRAND_GREEN};">${data.phone}</a>
        </td>
      </tr>
      ` : ""}
      ${data.subject ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Subject</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.subject}</td>
      </tr>
      ` : ""}
    </table>

    <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <p style="margin: 0 0 8px; font-weight: 600;">Message:</p>
      <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
    </div>

    <p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://lmc.co.ug"}/reception" style="${buttonStyle}">
        View in Reception
      </a>
    </p>
  `;
  return wrapper(content);
}

// ============================================
// STAFF INVITE TEMPLATE
// ============================================

export interface StaffInviteEmailData {
  email: string;
  role: "staff" | "admin";
  inviteLink: string;
}

export function staffInviteEmail(data: StaffInviteEmailData): string {
  const roleLabel = data.role === "admin" ? "Administrator" : "Staff Member";
  const content = `
    <h2 style="margin: 0 0 16px; color: ${BRAND_GREEN}; font-size: 22px;">
      You're Invited to Join LMC Staff Portal
    </h2>
    <p>Hello,</p>
    <p>
      You have been invited to join Lifeline Medical Centre's staff portal
      as a <strong>${roleLabel}</strong>.
    </p>

    <p style="text-align: center; margin: 32px 0;">
      <a href="${data.inviteLink}" style="${buttonStyle}">
        Accept Invitation & Set Password
      </a>
    </p>

    <p style="color: #666; font-size: 14px;">
      This invitation link will expire in 24 hours. If you did not expect
      this invitation, please ignore this email.
    </p>

    <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        <strong>What you'll be able to do:</strong><br>
        • Access the reception inbox<br>
        • View and manage appointments<br>
        • Access the staff roster<br>
        ${data.role === "admin" ? "• Invite other staff members<br>• Manage system settings" : ""}
      </p>
    </div>
  `;
  return wrapper(content);
}
