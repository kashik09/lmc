import type { ServicePage, ContentBlock } from "@/content/types";

/**
 * PageRenderer — Themed content renderer for ServicePage/InfoPage
 *
 * Mockup-faithful typography:
 * - Paragraph: 15px, 1.75 line-height, secondary text color
 * - Heading: Raleway uppercase with green underline rule
 * - List: Green chevron markers (unordered) or numbers (ordered)
 * - Blockquote: Green left border, italic
 * - Callout: Toned background with left border
 *
 * Refs: docs/visual-rebuild/mockup-reference/styles.css (.page-body)
 */

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="mb-5 text-[15px] leading-[1.75] text-lmc-textSecondary"
        >
          {block.text}
        </p>
      );

    case "heading": {
      const Tag = `h${block.level}` as "h2" | "h3" | "h4";
      const sizeClass =
        block.level === 2
          ? "text-[28px] mt-12 mb-4"
          : block.level === 3
            ? "text-[22px] mt-8 mb-3"
            : "text-[18px] mt-6 mb-2";
      return (
        <Tag
          key={idx}
          className={`font-heading font-bold uppercase tracking-tight text-lmc-textPrimary ${sizeClass}`}
        >
          {block.text}
        </Tag>
      );
    }

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={idx}
          className={`mb-6 space-y-2 ${block.ordered ? "list-decimal pl-6" : "list-none pl-0"}`}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[15px] leading-[1.7] text-lmc-textSecondary"
            >
              {!block.ordered && (
                <span className="shrink-0 font-bold text-lmc-green">›</span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ListTag>
      );
    }

    case "image":
      return (
        <figure key={idx} className="my-8">
          <img src={block.src} alt={block.alt} className="w-full" />
          {block.caption && (
            <figcaption className="mt-3 text-[13px] italic text-lmc-textSecondary">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-8 border-l-4 border-lmc-green pl-6 text-[16px] italic text-lmc-textPrimary"
        >
          {block.text}
          {block.attribution && (
            <footer className="mt-3 text-[13px] not-italic text-lmc-textSecondary">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "callout": {
      const toneClasses: Record<string, string> = {
        info: "bg-lmc-blueAccent/10 border-lmc-blueAccent",
        warn: "bg-yellow-50 border-yellow-400",
        success: "bg-lmc-green/10 border-lmc-green",
      };
      return (
        <div
          key={idx}
          className={`my-6 border-l-4 p-5 text-[15px] leading-[1.7] ${toneClasses[block.tone] ?? toneClasses.info}`}
        >
          {block.text}
        </div>
      );
    }

    default:
      return null;
  }
}

interface PageRendererProps {
  page: ServicePage;
  /** Render the page lede inline. Default true. */
  showLede?: boolean;
}

export function PageRenderer({ page, showLede = true }: PageRendererProps) {
  return (
    <article className="mx-auto max-w-3xl px-7 py-16">
      {/* Lede — larger intro text */}
      {showLede && page.lede && (
        <p className="mb-10 text-[18px] font-medium leading-[1.65] text-lmc-textPrimary">
          {page.lede}
        </p>
      )}

      {/* Sections */}
      {page.sections.map((section, i) => (
        <section key={i} className="mb-10 last:mb-0">
          {section.heading && (
            <>
              <h2 className="mb-2 font-heading text-[28px] font-bold uppercase tracking-tight text-lmc-textPrimary">
                {section.heading}
              </h2>
              <div className="mb-6 h-[3px] w-12 bg-lmc-green" />
            </>
          )}
          {section.blocks.map(renderBlock)}
        </section>
      ))}
    </article>
  );
}

export default PageRenderer;
