import type { ServicePage, ContentBlock } from "@/content/types";

interface ServiceDetailBodyProps {
  page: ServicePage;
}

/** Extract list items from a block if it's a list block */
function getListItems(block: ContentBlock): string[] {
  return block.type === "list" ? block.items : [];
}

export function ServiceDetailBody({ page }: ServiceDetailBodyProps) {
  // Sections that have list blocks become accordions
  const accordionSections = page.sections
    .map((section) => ({
      heading: section.heading ?? "Details",
      items: section.blocks.flatMap(getListItems),
      // Also gather paragraph text for sections without lists
      paragraphs: section.blocks
        .filter((b): b is Extract<ContentBlock, { type: "paragraph" }> => b.type === "paragraph")
        .map((b) => b.text),
    }))
    .filter((s) => s.items.length > 0 || s.paragraphs.length > 0);

  return (
    <div>
      {/* Intro (lede) */}
      {page.lede && (
        <p className="mb-6 font-body text-lg leading-relaxed text-lmc-grayDark">
          {page.lede}
        </p>
      )}

      {/* Accordion Sections */}
      {accordionSections.length > 0 ? (
        <div className="space-y-3">
          {accordionSections.map((section, index) => (
            <details
              key={section.heading}
              className="group border border-lmc-grayLight bg-white"
              open={index === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between p-4 font-heading font-semibold text-lmc-grayDark hover:bg-lmc-offWhite">
                {section.heading}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 transition-transform group-open:rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="border-t border-lmc-grayLight p-4">
                {/* Paragraphs first */}
                {section.paragraphs.map((text, i) => (
                  <p key={i} className="mb-4 font-body text-lmc-grayMedium last:mb-0">
                    {text}
                  </p>
                ))}
                {/* Then list items */}
                {section.items.length > 0 && (
                  <ul className="list-disc space-y-2 pl-6 font-body text-lmc-grayMedium">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="border border-lmc-grayLight bg-lmc-offWhite p-6 text-center">
          <p className="font-body text-lmc-grayMedium">
            Detailed information coming soon — to be provided by LMC.
          </p>
        </div>
      )}
    </div>
  );
}
