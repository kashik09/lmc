// content/lmc-images.ts
// Auto-classified from LMC Company Profile PDF extraction.
// Generic wiring only — NO name-face matching has been done.
// To swap a specific image: just change the filename string.

export type ImageClassification =
  | "landscape"
  | "portrait"
  | "square"
  | "decorative";

export interface LMCImage {
  src: string; // /images/lmc/<filename>
  classification: ImageClassification;
  width: number;
  height: number;
}

export const lmcImages: LMCImage[] = [
  // decorative (10) — logos, icons, tiny graphics — not exported for general use
  { src: "/images/lmc/28.png", classification: "decorative", width: 197, height: 138 },
  { src: "/images/lmc/29.png", classification: "decorative", width: 188, height: 77 },
  { src: "/images/lmc/30.png", classification: "decorative", width: 185, height: 103 },
  { src: "/images/lmc/31.png", classification: "decorative", width: 176, height: 121 },
  { src: "/images/lmc/32.png", classification: "decorative", width: 232, height: 149 },
  { src: "/images/lmc/33.png", classification: "decorative", width: 240, height: 154 },
  { src: "/images/lmc/34.png", classification: "decorative", width: 231, height: 154 },
  { src: "/images/lmc/35.png", classification: "decorative", width: 167, height: 167 },
  { src: "/images/lmc/36.png", classification: "decorative", width: 159, height: 158 },
  { src: "/images/lmc/38.jpg", classification: "decorative", width: 192, height: 147 },

  // landscape (23) — facility / hero candidates
  { src: "/images/lmc/1.png", classification: "landscape", width: 2490, height: 1763 },
  { src: "/images/lmc/11.jpg", classification: "landscape", width: 3037, height: 1646 },
  { src: "/images/lmc/12.jpg", classification: "landscape", width: 2701, height: 1566 },
  { src: "/images/lmc/13.jpg", classification: "landscape", width: 868, height: 664 },
  { src: "/images/lmc/14.jpg", classification: "landscape", width: 1007, height: 658 },
  { src: "/images/lmc/15.jpg", classification: "landscape", width: 1462, height: 541 },
  { src: "/images/lmc/16.jpg", classification: "landscape", width: 1951, height: 1113 },
  { src: "/images/lmc/18.jpg", classification: "landscape", width: 1124, height: 617 },
  { src: "/images/lmc/2.jpg", classification: "landscape", width: 645, height: 430 },
  { src: "/images/lmc/22.jpg", classification: "landscape", width: 1618, height: 1042 },
  { src: "/images/lmc/25.jpg", classification: "landscape", width: 2169, height: 1644 },
  { src: "/images/lmc/3.jpg", classification: "landscape", width: 691, height: 428 },
  { src: "/images/lmc/4.jpg", classification: "landscape", width: 570, height: 424 },
  { src: "/images/lmc/41.jpg", classification: "landscape", width: 543, height: 411 },
  { src: "/images/lmc/43.jpg", classification: "landscape", width: 2074, height: 894 },
  { src: "/images/lmc/44.jpg", classification: "landscape", width: 2384, height: 1437 },
  { src: "/images/lmc/47.jpg", classification: "landscape", width: 694, height: 493 },
  { src: "/images/lmc/48.jpg", classification: "landscape", width: 2481, height: 1485 },
  { src: "/images/lmc/49.jpg", classification: "landscape", width: 709, height: 470 },
  { src: "/images/lmc/5.jpg", classification: "landscape", width: 588, height: 424 },
  { src: "/images/lmc/50.jpg", classification: "landscape", width: 1918, height: 1046 },
  { src: "/images/lmc/51.png", classification: "landscape", width: 1899, height: 738 },
  { src: "/images/lmc/52.png", classification: "landscape", width: 584, height: 438 },

  // portrait (7) — individual headshot candidates
  { src: "/images/lmc/19.png", classification: "portrait", width: 1246, height: 2820 },
  { src: "/images/lmc/23.png", classification: "portrait", width: 1338, height: 2577 },
  { src: "/images/lmc/24.png", classification: "portrait", width: 1532, height: 2102 },
  { src: "/images/lmc/27.png", classification: "portrait", width: 1097, height: 1455 },
  { src: "/images/lmc/39.jpg", classification: "portrait", width: 733, height: 1013 },
  { src: "/images/lmc/8.png", classification: "portrait", width: 1680, height: 2776 },
  { src: "/images/lmc/9.png", classification: "portrait", width: 1177, height: 1408 },

  // square (12) — group photos, profile cards
  { src: "/images/lmc/10.png", classification: "square", width: 1178, height: 1033 },
  { src: "/images/lmc/17.jpg", classification: "square", width: 3187, height: 3316 },
  { src: "/images/lmc/20.jpg", classification: "square", width: 589, height: 480 },
  { src: "/images/lmc/21.jpg", classification: "square", width: 589, height: 480 },
  { src: "/images/lmc/26.jpg", classification: "square", width: 1115, height: 931 },
  { src: "/images/lmc/37.png", classification: "square", width: 980, height: 1003 },
  { src: "/images/lmc/40.jpg", classification: "square", width: 471, height: 540 },
  { src: "/images/lmc/42.jpg", classification: "square", width: 404, height: 372 },
  { src: "/images/lmc/45.png", classification: "square", width: 244, height: 196 },
  { src: "/images/lmc/46.png", classification: "square", width: 273, height: 217 },
  { src: "/images/lmc/6.png", classification: "square", width: 546, height: 632 },
  { src: "/images/lmc/7.png", classification: "square", width: 569, height: 636 },
];

// Convenience filters — decoratives are NOT exported (we don't want them rendering)
export const heroImages = lmcImages.filter(
  (i) => i.classification === "landscape"
);
export const portraitImages = lmcImages.filter(
  (i) => i.classification === "portrait"
);
export const squareImages = lmcImages.filter(
  (i) => i.classification === "square"
);

// Helpers — deterministic so SSR matches client
export function pickImageBy(
  classification: ImageClassification,
  index = 0
): LMCImage | undefined {
  const pool = lmcImages.filter((i) => i.classification === classification);
  if (pool.length === 0) return undefined;
  return pool[index % pool.length];
}

// Simple hash for deterministic selection based on string (e.g., slug)
export function pickImageBySlug(
  classification: ImageClassification,
  slug: string
): LMCImage | undefined {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return pickImageBy(classification, hash);
}
