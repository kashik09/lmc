/**
 * Form field styling helpers — class string exports only
 *
 * Used by appointment-form, contact-form, date-picker-field
 * Focus: green border + 1px ring (LMC brand)
 * Errors: red border + ring via aria-invalid
 */

const baseInputClass = [
  "w-full px-4 py-2.5 rounded-btn font-body text-base text-lmc-grayDark bg-white",
  "border border-lmc-grayLight",
  "transition-colors duration-200",
  "placeholder:text-lmc-grayMedium",
  "focus:outline-none focus:border-lmc-green focus:ring-1 focus:ring-lmc-green",
  "disabled:opacity-60 disabled:cursor-not-allowed",
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500",
].join(" ");

export const inputClass = baseInputClass;
export const textareaClass = `${baseInputClass} min-h-[120px] resize-y`;
export const selectClass = baseInputClass;
export const labelClass =
  "block font-body text-sm font-semibold text-lmc-grayDark mb-1.5";

/** Dark background variants — for use on navy/green containers */
export const labelClassDark =
  "block font-body text-sm font-semibold text-white mb-1.5";
export const inputClassDark = [
  "w-full px-4 py-2.5 rounded-btn font-body text-base text-lmc-grayDark bg-white",
  "border border-white/20",
  "transition-colors duration-200",
  "placeholder:text-lmc-grayMedium",
  "focus:outline-none focus:border-white focus:ring-1 focus:ring-white",
  "disabled:opacity-60 disabled:cursor-not-allowed",
  "aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-400",
].join(" ");
export const textareaClassDark = `${inputClassDark} min-h-[120px] resize-y`;
export const errorClass = "mt-1.5 text-sm text-red-600 font-body";
export const fieldWrapperClass = "mb-5";

/** Global error banner (rate limit, captcha failed, etc.) */
export const globalErrorClass =
  "p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-body flex items-start gap-2";

/** Success banner (if inline success message is shown) */
export const successBannerClass =
  "p-4 bg-green-50 border-l-4 border-lmc-green text-lmc-grayDark text-sm font-body flex items-start gap-2";
