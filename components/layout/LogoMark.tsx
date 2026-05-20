/**
 * LogoMark — 8x8 checkered cross SVG logo
 *
 * Green uses LMC brand override #1b7a12 (not mockup's #0E8A6D)
 * Pattern ID namespaced to avoid SVG collisions
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <pattern
          id="lmc-checker"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <rect width="4" height="4" fill="#1b7a12" />
          <rect width="2" height="2" fill="#fff" />
          <rect x="2" y="2" width="2" height="2" fill="#fff" />
        </pattern>
      </defs>
      <path
        d="M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z"
        fill="url(#lmc-checker)"
        stroke="#1b7a12"
        strokeWidth="0.5"
      />
    </svg>
  );
}
