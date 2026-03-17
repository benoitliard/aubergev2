/**
 * Newsletter — Email subscription section for Les Balcons / L'Auberge
 *
 * Usage:
 * ```tsx
 * import Newsletter from '@/components/sections/Newsletter';
 *
 * // Minimal
 * <Newsletter />
 *
 * // With submit handler
 * <Newsletter onSubmit={({ email, type }) => console.log(email, type)} />
 * ```
 */

import { useCallback, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NewsletterFormData {
  email: string;
  type: string;
}

export interface NewsletterProps {
  /** Called with validated form data when the user submits the form. */
  onSubmit?: (data: NewsletterFormData) => void;
}

interface FormState {
  email: string;
  type: string;
}

interface ValidationErrors {
  email?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COMMUNICATION_TYPES = [
  { value: "tous", label: "Tous" },
  { value: "evenements", label: "Événements" },
  { value: "offres", label: "Offres spéciales" },
  { value: "actualites", label: "Actualités" },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Newsletter({ onSubmit }: NewsletterProps) {
  const [form, setForm] = useState<FormState>({ email: "", type: "tous" });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────

  const validate = useCallback((data: FormState): ValidationErrors => {
    const next: ValidationErrors = {};
    if (!data.email.trim()) {
      next.email = "L'adresse courriel est requise.";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      next.email = "Veuillez entrer une adresse courriel valide.";
    }
    return next;
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (name in errors) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof ValidationErrors];
          return next;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validate(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      setSubmitted(true);
      onSubmit?.({ email: form.email.trim(), type: form.type });
    },
    [form, validate, onSubmit]
  );

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[var(--color-beige-100)] px-4 py-12 desktop:px-24 desktop:py-16"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="Les Balcons"
          width={160}
          height={32}
          className="h-auto w-40"
          aria-hidden="false"
        />

        {/* Text block */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="font-body text-body-md text-[var(--color-charcoal)]"
            aria-label="Section"
          >
            Abonnement à l'infolettre
          </p>
          <h2
            id="newsletter-heading"
            className="font-title text-h4 font-extrabold leading-[1.2] text-[var(--color-charcoal)]"
          >
            Restez au courant des nouveautés de l'Auberge.
          </h2>
        </div>

        {/* Form */}
        {submitted ? (
          <p
            role="status"
            aria-live="polite"
            className="font-body text-body-md text-[var(--color-green-dark)]"
          >
            Merci pour votre abonnement !
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col gap-4 desktop:flex-row desktop:items-end"
            aria-label="Formulaire d'abonnement à l'infolettre"
          >
            {/* Email field */}
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="newsletter-email"
                className="font-body text-body-lg text-[var(--color-charcoal)]"
              >
                Adresse courriel{" "}
                <span
                  aria-label="obligatoire"
                  className="font-extrabold text-[var(--color-green-dark)]"
                >
                  *
                </span>
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Inscris ton adresse courriel"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "newsletter-email-error" : undefined
                }
                autoComplete="email"
                className={[
                  "w-full rounded-full border bg-white px-6 py-4",
                  "font-body text-body-md text-[var(--color-charcoal)]",
                  "placeholder:text-[var(--color-green-dark)]",
                  "outline-none transition-shadow",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)] focus-visible:ring-offset-2",
                  errors.email
                    ? "border-red-600"
                    : "border-[var(--color-green-dark)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
              {errors.email && (
                <p
                  id="newsletter-email-error"
                  role="alert"
                  className="font-body text-body-xs text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Communication type field */}
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="newsletter-type"
                className="font-body text-body-lg text-[var(--color-charcoal)]"
              >
                Type de communication{" "}
                <span
                  aria-label="obligatoire"
                  className="font-extrabold text-[var(--color-green-dark)]"
                >
                  *
                </span>
              </label>
              <div className="relative">
                <select
                  id="newsletter-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className={[
                    "w-full appearance-none rounded-full border border-[var(--color-green-dark)]",
                    "bg-white px-6 py-4 pr-12",
                    "font-body text-body-md text-[var(--color-charcoal)]",
                    "outline-none transition-shadow",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-green-dark)] focus-visible:ring-offset-2",
                  ].join(" ")}
                >
                  {COMMUNICATION_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[var(--color-green-dark)]"
                >
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={[
                "shrink-0 rounded-full bg-[var(--color-charcoal)] px-8 py-4",
                "font-body text-body-md font-extrabold text-[var(--color-beige-100)]",
                "transition-opacity hover:opacity-80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-charcoal)] focus-visible:ring-offset-2",
                "active:opacity-70",
                "desktop:self-end",
              ].join(" ")}
            >
              Je m'abonne à l'infolettre
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
