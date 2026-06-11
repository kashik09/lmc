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
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-10 w-10"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    <circle cx="6" cy="18" r="2" fill="currentColor" stroke="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 16V8a4 4 0 014-4h0a4 4 0 014 4v2" />
                    <circle cx="18" cy="6" r="3" />
                  </svg>
                )}
                {box.id === "about-us" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
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
