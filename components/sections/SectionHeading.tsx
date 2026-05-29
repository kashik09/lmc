import { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small uppercase eyebrow above the heading (e.g. "About Us", "Our Services") */
  eyebrow?: string;
  /** Main heading text */
  title: ReactNode;
  /** Optional subtitle below the heading */
  subtitle?: string;
  /** Alignment of the heading and accent bar */
  align?: "left" | "center";
  /** Color theme. "light" = for white/light backgrounds. "dark" = for navy/dark backgrounds. */
  theme?: "light" | "dark";
  /** Optional additional className for the wrapper */
  className?: string;
};

/**
 * SectionHeading — Lamogi-pattern rhythm: eyebrow / heading / accent bar / subtitle.
 *
 * Use this as the top of EVERY page section to maintain consistent visual rhythm.
 *
 * Theme:
 * - "light" (default): for sections on white or lmc-pageBg
 *   - eyebrow: lmc-green
 *   - heading: lmc-grayDark
 *   - subtitle: lmc-grayMedium
 *   - accent bar: lmc-green
 * - "dark": for sections on lmc-blue (navy) or other dark backgrounds
 *   - eyebrow: mint green (#75d69c)
 *   - heading: white
 *   - subtitle: white/85
 *   - accent bar: mint green
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  const eyebrowColor = isDark ? "text-[#75d69c]" : "text-lmc-green";
  const titleColor = isDark ? "text-white" : "text-lmc-grayDark";
  const subtitleColor = isDark ? "text-white/85" : "text-lmc-grayMedium";
  const barColor = isDark ? "bg-[#75d69c]" : "bg-lmc-green";

  return (
    <div
      className={[isCenter ? "text-center" : "text-left", className].join(" ")}
    >
      {eyebrow && (
        <p
          className={[
            "mb-2 text-[11px] font-bold uppercase tracking-[0.18em]",
            eyebrowColor,
          ].join(" ")}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          "text-3xl font-bold tracking-tight md:text-4xl",
          titleColor,
        ].join(" ")}
      >
        {title}
      </h2>
      <div
        className={[
          "mb-4 mt-4 h-[3px] w-[70px]",
          barColor,
          isCenter ? "mx-auto" : "",
        ].join(" ")}
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={[
            "max-w-2xl text-base leading-relaxed",
            subtitleColor,
            isCenter ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
