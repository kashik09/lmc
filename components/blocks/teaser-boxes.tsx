import Link from "next/link";
import { teaserBoxes } from "@/content/home";

export function TeaserBoxes() {
  return (
    <section className="relative -mt-16 z-30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-3">
          {teaserBoxes.map((box, index) => (
            <Link
              key={box.id}
              href={box.link}
              className={`group relative flex flex-col items-center justify-center px-6 py-8 text-center text-primary-foreground transition-transform hover:scale-105 ${box.colorClass}`}
            >
              {/* Triangular separator - right side */}
              {index < teaserBoxes.length - 1 && (
                <div
                  className="absolute right-0 top-0 hidden h-full w-4 md:block"
                  style={{
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    backgroundColor: "inherit",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Icon */}
              <div className="mb-3">
                {box.id === "medical-services" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H3v1.5h3.973a3 3 0 004.277 4.204V21h1.5v-4.046a3 3 0 004.277-4.204H21v-1.5h-3.973a3 3 0 00-4.277-4.204V3h-1.5z" />
                  </svg>
                )}
                {box.id === "find-doctor" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {box.id === "appointment" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <h3 className="mb-1 font-heading text-xl font-semibold">
                {box.title}
              </h3>
              <p className="text-sm opacity-90">{box.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
