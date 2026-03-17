/**
 * BookingWidget — Beds24 booking search form.
 *
 * Renders a horizontal form (date, nights, guests, search button) that
 * submits to the Beds24 booking page in a new tab.
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

function generateDayOptions(lang: "fr" | "en") {
  const days: { value: string; label: string }[] = [];
  const formatter = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    weekday: "short",
    day: "numeric",
  });

  // Generate days for current month by default
  for (let i = 1; i <= 31; i++) {
    days.push({ value: String(i), label: String(i) });
  }
  return days;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BookingWidget({
  propId = "47579",
  lang = "fr",
}: BookingWidgetProps) {
  const months = useMemo(() => generateMonthOptions(lang), [lang]);
  const days = useMemo(() => generateDayOptions(lang), [lang]);
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
        "rounded-2xl bg-white p-4 lg:px-6 lg:py-3",
        "shadow-sm",
      ].join(" ")}
    >
      {/* Hidden fields */}
      <input type="hidden" name="propid" value={propId} />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="referer" value="web" />

      {/* Arrival date */}
      <div className="flex flex-1 flex-col gap-1 lg:border-r lg:border-gray-200 lg:pr-4">
        <label
          className="text-[length:var(--text-body-xs)] text-[var(--color-charcoal)]/60"
          htmlFor="bw-date"
        >
          {labels.arrival}
        </label>
        <div className="flex gap-2">
          <select
            id="bw-date"
            name="fdate_date"
            className={[
              "flex-1 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2",
              "font-[family-name:var(--font-body)] text-[length:var(--text-body-xs)]",
              "text-[var(--color-charcoal)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)]",
            ].join(" ")}
          >
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <select
            name="fdate_monthyear"
            className={[
              "flex-1 appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2",
              "font-[family-name:var(--font-body)] text-[length:var(--text-body-xs)]",
              "text-[var(--color-charcoal)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)]",
            ].join(" ")}
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nights */}
      <div className="flex flex-col gap-1 lg:border-r lg:border-gray-200 lg:px-4">
        <label
          className="text-[length:var(--text-body-xs)] text-[var(--color-charcoal)]/60"
          htmlFor="bw-nights"
        >
          {labels.nights}
        </label>
        <select
          id="bw-nights"
          name="numnight"
          defaultValue="1"
          className={[
            "appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2",
            "font-[family-name:var(--font-body)] text-[length:var(--text-body-xs)]",
            "text-[var(--color-charcoal)] lg:w-20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)]",
          ].join(" ")}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div className="flex flex-col gap-1 lg:px-4">
        <label
          className="text-[length:var(--text-body-xs)] text-[var(--color-charcoal)]/60"
          htmlFor="bw-guests"
        >
          {labels.guests}
        </label>
        <select
          id="bw-guests"
          name="numadult"
          defaultValue="2"
          className={[
            "appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2",
            "font-[family-name:var(--font-body)] text-[length:var(--text-body-xs)]",
            "text-[var(--color-charcoal)] lg:w-20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)]",
          ].join(" ")}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="lg:pl-4">
        <button
          type="submit"
          className={[
            "w-full lg:w-auto",
            "rounded-full bg-[var(--color-yellow-500)] px-6 py-3",
            "font-[family-name:var(--font-title)] font-extrabold",
            "text-[length:var(--text-body-xs)]",
            "text-[var(--color-charcoal)]",
            "transition-opacity hover:opacity-80",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-charcoal)]",
            "cursor-pointer",
          ].join(" ")}
        >
          {labels.search}
        </button>
      </div>
    </form>
  );
}

export default BookingWidget;
