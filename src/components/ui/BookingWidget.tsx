/**
 * BookingWidget — Beds24 booking search form matching the Les Balcons design.
 *
 * Compact horizontal bar: calendar icon, date selects, nights, guests, search.
 * White background, rounded-full pill selects with green-dark borders,
 * yellow "Rechercher" button. Stacks vertically on mobile.
 *
 * Usage:
 * ```tsx
 * <BookingWidget propId="47579" lang="fr" />
 * ```
 */

import { useMemo } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BookingWidgetProps {
  /** Beds24 property ID. */
  propId?: string;
  /** Language code (fr or en). */
  lang?: "fr" | "en";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateMonthOptions(lang: "fr" | "en") {
  const now = new Date();
  const months: { value: string; label: string }[] = [];
  const formatter = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    month: "short",
    year: "numeric",
  });

  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months.push({ value, label: formatter.format(d) });
  }
  return months;
}

// ---------------------------------------------------------------------------
// Shared select styles
// ---------------------------------------------------------------------------

const selectClasses = [
  "appearance-none",
  "border border-gray-300",
  "bg-white px-3 py-2",
  "font-[family-name:var(--font-body)]",
  "text-[14px] leading-[1.4]",
  "text-[var(--color-charcoal)]",
  "outline-none",
  "focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)]",
].join(" ");

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-[var(--color-green-dark)]"
    >
      <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="5" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="9" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="13" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BookingWidget({
  propId = "47579",
  lang = "fr",
}: BookingWidgetProps) {
  const months = useMemo(() => generateMonthOptions(lang), [lang]);
  const labels = lang === "fr"
    ? { arrival: "Arrivée", nights: "Nuit(s)", guests: "Client(s)", search: "Rechercher" }
    : { arrival: "Check-in", nights: "Night(s)", guests: "Guest(s)", search: "Search" };

  return (
    <form
      target="_blank"
      method="post"
      action="https://www.beds24.com/booking2.php"
      className={[
        "mx-auto w-full max-w-[900px]",
        "flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-0",
        "bg-white rounded-lg px-4 py-3 lg:px-5 lg:py-2.5",
      ].join(" ")}
    >
      {/* Hidden fields */}
      <input type="hidden" name="propid" value={propId} />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="referer" value="web" />

      {/* Arrival date */}
      <div className="flex flex-1 flex-col gap-1 lg:border-r lg:border-gray-200 lg:pr-3">
        <span className="text-[12px] text-[var(--color-charcoal)]/60">{labels.arrival}</span>
        <div className="flex items-center gap-1.5">
          <CalendarIcon />
          <select id="bw-date" name="fdate_date" className={`${selectClasses} flex-1`}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select name="fdate_monthyear" className={`${selectClasses} flex-1`}>
            {months.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Nights */}
      <div className="flex flex-col gap-1 lg:border-r lg:border-gray-200 lg:px-3">
        <span className="text-[12px] text-[var(--color-charcoal)]/60">{labels.nights}</span>
        <select id="bw-nights" name="numnight" defaultValue="1" className={`${selectClasses} lg:w-16`}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div className="flex flex-col gap-1 lg:px-3">
        <span className="text-[12px] text-[var(--color-charcoal)]/60">{labels.guests}</span>
        <select id="bw-guests" name="numadult" defaultValue="2" className={`${selectClasses} lg:w-16`}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={[
          "w-full lg:w-auto shrink-0",
          "rounded-md bg-[var(--color-yellow-500)]",
          "px-6 py-2",
          "font-[family-name:var(--font-title)] font-extrabold",
          "text-[14px] leading-[1.5]",
          "text-[var(--color-charcoal)]",
          "transition-opacity hover:opacity-80",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
          "cursor-pointer",
        ].join(" ")}
      >
        {labels.search}
      </button>
    </form>
  );
}

export default BookingWidget;
