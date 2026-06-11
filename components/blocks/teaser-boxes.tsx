import Link from "next/link";
import { Stethoscope, Users, CalendarDays } from "lucide-react";
import { teaserBoxes } from "@/content/home";

const iconMap = {
  "medical-services": Stethoscope,
  "about-us": Users,
  appointment: CalendarDays,
};

export function TeaserBoxes() {
  return (
    <section className="relative -mt-16 z-30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-3">
          {teaserBoxes.map((box) => {
            const Icon = iconMap[box.id as keyof typeof iconMap];
            return (
              <Link
                key={box.id}
                href={box.link}
                className={`group flex items-center gap-5 px-7 py-7 text-white transition-colors hover:brightness-110 ${box.colorClass}`}
              >
                {/* Outlined circle icon */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/60">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-heading text-base font-bold uppercase tracking-wide">
                    {box.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/80">
                    {box.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
