// Shared shape for any LMC page content extracted from the WP backup.

export interface PageSection {
  /** Optional section heading */
  heading?: string;
  /** Block-level content: paragraphs, lists, etc. */
  blocks: ContentBlock[];
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'callout'; tone: 'info' | 'warn' | 'success'; text: string };

export interface ServicePage {
  slug: string;
  title: string;
  /** One-line subtitle / tagline */
  lede?: string;
  /** Hero or banner image, if any (from WP backup) */
  heroImage?: { src: string; alt: string };
  sections: PageSection[];
  /** Free-form metadata: keywords, last updated, etc. */
  meta?: Record<string, string>;
}

export interface InfoPage extends ServicePage {
  // Same shape for now — keeping separate type for future divergence
}

export interface InsurancePartner {
  name: string;
  logo?: { src: string; alt: string };
  url?: string;
}

export interface InsurancePartnersPage extends InfoPage {
  partners: InsurancePartner[];
}
