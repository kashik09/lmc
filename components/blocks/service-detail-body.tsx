"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ServicePage, ContentBlock } from "@/content/types";

/**
 * ServiceDetailBody — Mockup-style service detail content
 *
 * - 38px uppercase heading + 70px green rule
 * - Accordion sections with green left-border, rotating green chevron
 * - Green › markers on list items
 *
 * Refs: docs/visual-rebuild/00-mockup-spec.md, mockup-reference/service-detail.html
 */

interface ServiceDetailBodyProps {
  page: ServicePage;
}

/** Extract list items from a block if it's a list block */
function getListItems(block: ContentBlock): string[] {
  return block.type === "list" ? block.items : [];
}

export function ServiceDetailBody({ page }: ServiceDetailBodyProps) {
  // Sections that have list blocks or paragraphs become accordion items
  const accordionSections = page.sections
    .map((section) => ({
      heading: section.heading ?? "Details",
      items: section.blocks.flatMap(getListItems),
      paragraphs: section.blocks
        .filter(
          (b): b is Extract<ContentBlock, { type: "paragraph" }> =>
            b.type === "paragraph"
        )
        .map((b) => b.text),
    }))
    .filter((s) => s.items.length > 0 || s.paragraphs.length > 0);

  // Track which sections are open (first one open by default)
  const [openSections, setOpenSections] = useState<Set<number>>(
    new Set(accordionSections.length > 0 ? [0] : [])
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div>
      {/* Service Detail Head */}
      <div className="mb-7">
        {/* 38px uppercase heading */}
        <h2 className="mb-3 font-heading text-[38px] font-bold uppercase leading-tight tracking-[0.01em] text-lmc-grayDark">
          {page.title}
        </h2>

        {/* 70px green rule */}
        <div className="mb-5 h-[3px] w-[70px] bg-lmc-green" />

        {/* Lede */}
        {page.lede && (
          <p className="mb-4 text-[15.5px] leading-[1.75] text-[#555]">
            {page.lede}
          </p>
        )}
      </div>

      {/* Procedures / Sections Accordion */}
      {accordionSections.length > 0 ? (
        <div className="mt-9 border border-lmc-borderLight bg-white p-8">
          <h3 className="mb-5 font-heading text-[22px] font-bold uppercase tracking-[0.03em] text-lmc-grayDark">
            Procedures &amp; Details
          </h3>

          <div className="flex flex-col gap-3.5">
            {accordionSections.map((section, index) => {
              const isOpen = openSections.has(index);

              return (
                <div
                  key={section.heading}
                  className="border border-lmc-borderLight bg-white"
                >
                  {/* Accordion Head */}
                  <button
                    type="button"
                    onClick={() => toggleSection(index)}
                    className={`flex w-full items-center justify-between border-l-4 px-6 py-5 text-left font-heading text-[19px] font-bold transition-colors ${
                      isOpen
                        ? "border-l-lmc-green bg-[#fafdfb] text-lmc-green"
                        : "border-l-transparent text-lmc-grayDark hover:text-lmc-green"
                    }`}
                  >
                    <span>{section.heading}</span>

                    {/* Chevron — rotates and turns green when open */}
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 border-lmc-green bg-lmc-green text-white"
                          : "border-lmc-borderLight text-lmc-grayMedium"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </button>

                  {/* Accordion Body */}
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isOpen ? "max-h-[2000px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-7 pt-2">
                      {/* Paragraphs */}
                      {section.paragraphs.map((text, i) => (
                        <p
                          key={i}
                          className="mb-3 text-[14.5px] leading-[1.7] text-[#555] last:mb-0"
                        >
                          {text}
                        </p>
                      ))}

                      {/* List items with green › markers */}
                      {section.items.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {section.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-[14.5px] leading-[1.7] text-[#555]"
                            >
                              <span className="mt-0.5 font-bold text-lmc-green">
                                ›
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border border-lmc-borderLight bg-lmc-offWhite p-6 text-center">
          <p className="text-[14.5px] text-lmc-grayMedium">
            Detailed information coming soon — to be provided by LMC.
          </p>
        </div>
      )}
    </div>
  );
}
