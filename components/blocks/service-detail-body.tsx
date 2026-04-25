import { serviceDetails } from "@/content/services";

interface ServiceDetailBodyProps {
  slug: string;
}

export function ServiceDetailBody({ slug }: ServiceDetailBodyProps) {
  const service = serviceDetails[slug];

  if (!service) {
    return null;
  }

  return (
    <div>
      {/* Intro */}
      <p className="mb-6 text-muted-foreground leading-relaxed">
        {service.intro}
      </p>

      {/* Accordion Sections */}
      {service.sections.length > 0 ? (
        <div className="space-y-3">
          {service.sections.map((section, index) => (
            <details
              key={section.title}
              className="group rounded-lg border border-border bg-card"
              open={index === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between p-4 font-heading font-semibold text-card-foreground hover:bg-muted/50">
                {section.title}
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
              <div className="border-t border-border p-4">
                {slug === "dental" ? (
                  <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
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
        <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">
            Detailed information coming soon — to be provided by LMC.
          </p>
        </div>
      )}
    </div>
  );
}
