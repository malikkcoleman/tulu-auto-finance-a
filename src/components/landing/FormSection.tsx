"use client";

import { useMemo, useState } from "react";

type CreditSituation = "Good" | "Fair" | "Poor" | "No credit";
type EmploymentStatus = "Employed" | "Self-employed" | "Not employed";
type IncomeRange =
  | ""
  | "Under $2,000"
  | "$2,000–$3,499"
  | "$3,500–$4,999"
  | "$5,000+";
type VehicleType = "" | "Car" | "SUV" | "Truck" | "Van" | "Not sure";
type Timeline = "" | "ASAP" | "2–4 weeks" | "1–2 months" | "3+ months" | "Just exploring";

type Step = 1 | 2 | 3 | "done";

type PrequalPayload = {
  submissionId?: string;
  creditSituation: CreditSituation | "";
  employmentStatus: EmploymentStatus | "";
  monthlyIncomeRange: IncomeRange;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicleType: VehicleType;
  timeline: Timeline;
};

const creditOptions: CreditSituation[] = ["Good", "Fair", "Poor", "No credit"];
const employmentOptions: EmploymentStatus[] = [
  "Employed",
  "Self-employed",
  "Not employed",
];
const incomeOptions: IncomeRange[] = [
  "",
  "Under $2,000",
  "$2,000–$3,499",
  "$3,500–$4,999",
  "$5,000+",
];
const vehicleOptions: VehicleType[] = ["", "Car", "SUV", "Truck", "Van", "Not sure"];
const timelineOptions: Timeline[] = [
  "",
  "ASAP",
  "2–4 weeks",
  "1–2 months",
  "3+ months",
  "Just exploring",
];

function normalizePhone(input: string) {
  return input.replace(/[^\d+]/g, "");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export default function FormSection() {
  const [step, setStep] = useState<Step>(1);
  const [submissionId, setSubmissionId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<PrequalPayload>({
    creditSituation: "",
    employmentStatus: "",
    monthlyIncomeRange: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    vehicleType: "",
    timeline: "",
  });

  const softGateTone = useMemo(() => {
    const weakerEmployment = data.employmentStatus === "Not employed";
    const weakerCredit =
      data.creditSituation === "Poor" || data.creditSituation === "No credit";
    const weakerIncome = data.monthlyIncomeRange === "Under $2,000";

    if (weakerEmployment && (weakerCredit || weakerIncome)) return "caution";
    if (weakerCredit || weakerEmployment) return "mixed";
    return "positive";
  }, [data.creditSituation, data.employmentStatus, data.monthlyIncomeRange]);

  const afterStep1Message =
    softGateTone === "positive"
      ? "Based on what you told us, you may qualify. Let\u2019s get a few details."
      : softGateTone === "mixed"
        ? "Based on what you told us, you may qualify. A few details will help us give you a real answer."
        : "We may still be able to help, but it depends on a few details. Let\u2019s get the basics so we can be direct with you.";

  async function submitToApi(payload: PrequalPayload & { stage: "contact" | "enrichment" }) {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/prequal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; submissionId?: string; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      if (json.submissionId) setSubmissionId(json.submissionId);
      return json.submissionId;
    } finally {
      setIsSubmitting(false);
    }
  }

  function stepLabel() {
    if (step === "done") return "Done";
    return `Step ${step} of 3`;
  }

  return (
    <section id="apply" className="scroll-mt-20 bg-[#112A34] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F7F6]">
            Check if this is a fit
          </h2>
          <p className="mt-4 text-lg text-[#AFC3C7] max-w-xl mx-auto">
            Quick pre-qualification. Not everyone qualifies — we&apos;ll be honest either way.
          </p>
        </div>

        <div className="rounded-2xl border border-[rgba(127,208,181,0.20)] ring-1 ring-[rgba(127,208,181,0.08)] bg-[#F4F7F6] text-[#0F2027] shadow-[0_24px_80px_-30px_rgba(0,0,0,0.7),0_0_40px_-15px_rgba(127,208,181,0.12)] overflow-hidden">
          <div className="px-6 py-5 md:px-10 md:py-6 border-b border-[rgba(15,32,39,0.10)] bg-white/60">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-[#0F2027]">{stepLabel()}</p>
              <div className="flex items-center gap-1.5">
                <Dot active={step === 1} />
                <Dot active={step === 2} />
                <Dot active={step === 3} />
              </div>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            {error ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            <div className="relative">
              {/* Step 1 */}
              <div
                className={[
                  "transition-all duration-300",
                  step === 1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none absolute inset-0",
                ].join(" ")}
              >
                <h3 className="text-2xl font-bold text-[#0F2027]">
                  Let&apos;s see if this makes sense for you
                </h3>
                <p className="mt-2 text-sm text-[#465A60]">
                  Pre-qualification only. Your score won&apos;t be affected.
                </p>

                <div className="mt-6 grid gap-6">
                  <Field>
                    <Label>How would you describe your credit right now?</Label>
                    <OptionCards
                      value={data.creditSituation}
                      onChange={(v) =>
                        setData((d) => ({ ...d, creditSituation: v }))
                      }
                      options={creditOptions}
                    />
                  </Field>

                  <Field>
                    <Label>What&apos;s your employment status?</Label>
                    <OptionCards
                      value={data.employmentStatus}
                      onChange={(v) =>
                        setData((d) => ({ ...d, employmentStatus: v }))
                      }
                      options={employmentOptions}
                    />
                  </Field>

                  <Field>
                    <Label>
                      About how much do you bring in monthly? <span className="text-[#6B7C81]">(optional)</span>
                    </Label>
                    <Select
                      value={data.monthlyIncomeRange}
                      onChange={(v) =>
                        setData((d) => ({ ...d, monthlyIncomeRange: v as IncomeRange }))
                      }
                      placeholder="Select a range"
                      options={incomeOptions}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p className="text-xs text-[#5C7076]">
                    Not everyone qualifies. We won&apos;t ask for personal contact info until the next step.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      if (!data.creditSituation || !data.employmentStatus) {
                        setError("Please choose your credit situation and employment status.");
                        return;
                      }
                      setStep(2);
                    }}
                    className="inline-flex items-center justify-center bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.25),0_0_0_3px_rgba(127,208,181,0.35),0_16px_40px_-20px_rgba(15,32,39,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.4),0_16px_40px_-20px_rgba(15,32,39,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.55)]"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={[
                  "transition-all duration-300",
                  step === 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none absolute inset-0",
                ].join(" ")}
              >
                <h3 className="text-2xl font-bold text-[#0F2027]">
                  Where should we send your approval?
                </h3>
                <p className="mt-2 text-sm text-[#465A60]">{afterStep1Message}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field>
                    <Label>First name</Label>
                    <Input
                      value={data.firstName}
                      onChange={(v) => setData((d) => ({ ...d, firstName: v }))}
                      placeholder="Your first name"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field>
                    <Label>Last name</Label>
                    <Input
                      value={data.lastName}
                      onChange={(v) => setData((d) => ({ ...d, lastName: v }))}
                      placeholder="Your last name"
                      autoComplete="family-name"
                    />
                  </Field>
                  <Field className="md:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      value={data.phone}
                      onChange={(v) =>
                        setData((d) => ({ ...d, phone: normalizePhone(v) }))
                      }
                      placeholder="(___) ___-____"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field className="md:col-span-1">
                    <Label>Email</Label>
                    <Input
                      value={data.email}
                      onChange={(v) => setData((d) => ({ ...d, email: v }))}
                      placeholder="you@example.com"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStep(1);
                    }}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0F2027] border border-[rgba(15,32,39,0.18)] hover:border-[rgba(15,32,39,0.28)] bg-white/70 hover:bg-white transition-colors"
                  >
                    Back
                  </button>

                  <div className="flex flex-col items-stretch md:items-end gap-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        setError(null);
                        if (!data.firstName.trim() || !data.lastName.trim()) {
                          setError("Please enter your first and last name.");
                          return;
                        }
                        if (!isValidPhone(data.phone)) {
                          setError("Please enter a valid phone number.");
                          return;
                        }
                        if (!isValidEmail(data.email)) {
                          setError("Please enter a valid email address.");
                          return;
                        }

                        try {
                          await submitToApi({
                            ...data,
                            submissionId,
                            stage: "contact",
                          });
                          setStep(3);
                        } catch (e) {
                          setError(
                            e instanceof Error
                              ? e.message
                              : "Something went wrong. Please try again.",
                          );
                        }
                      }}
                      className="inline-flex items-center justify-center bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] disabled:opacity-60 text-[#0F2027] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.25),0_0_0_3px_rgba(127,208,181,0.35),0_16px_40px_-20px_rgba(15,32,39,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.4),0_16px_40px_-20px_rgba(15,32,39,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.55)]"
                    >
                      {isSubmitting ? "Sending\u2026" : "Send my result"}
                    </button>
                    <p className="text-xs text-[#5C7076] md:text-right">
                      Takes 2 minutes. No hard credit check.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={[
                  "transition-all duration-300",
                  step === 3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none absolute inset-0",
                ].join(" ")}
              >
                <h3 className="text-2xl font-bold text-[#0F2027]">Final details</h3>
                <p className="mt-2 text-sm text-[#465A60]">
                  Optional — this just helps us be more specific.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field>
                    <Label>What type of vehicle are you looking for?</Label>
                    <Select
                      value={data.vehicleType}
                      onChange={(v) =>
                        setData((d) => ({ ...d, vehicleType: v as VehicleType }))
                      }
                      placeholder="Select one (optional)"
                      options={vehicleOptions}
                    />
                  </Field>
                  <Field>
                    <Label>What&apos;s your timeline?</Label>
                    <Select
                      value={data.timeline}
                      onChange={(v) =>
                        setData((d) => ({ ...d, timeline: v as Timeline }))
                      }
                      placeholder="Select one (optional)"
                      options={timelineOptions}
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStep(2);
                    }}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0F2027] border border-[rgba(15,32,39,0.18)] hover:border-[rgba(15,32,39,0.28)] bg-white/70 hover:bg-white transition-colors"
                  >
                    Back
                  </button>

                  <div className="flex flex-col items-stretch md:items-end gap-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        setError(null);
                        try {
                          await submitToApi({
                            ...data,
                            submissionId,
                            stage: "enrichment",
                          });
                          setStep("done");
                        } catch (e) {
                          setError(
                            e instanceof Error
                              ? e.message
                              : "Something went wrong. Please try again.",
                          );
                        }
                      }}
                      className="inline-flex items-center justify-center bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] disabled:opacity-60 text-[#0F2027] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.25),0_0_0_3px_rgba(127,208,181,0.35),0_16px_40px_-20px_rgba(15,32,39,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.4),0_16px_40px_-20px_rgba(15,32,39,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.55)]"
                    >
                      {isSubmitting ? "Sending\u2026" : "Finish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("done")}
                      className="text-sm font-semibold text-[#0F2027] underline underline-offset-4 hover:text-black"
                    >
                      Skip this step
                    </button>
                  </div>
                </div>
              </div>

              {/* Done */}
              <div
                className={[
                  "transition-all duration-300",
                  step === "done"
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none absolute inset-0",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0F2027] text-[#7FD0B5] flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F2027]">You&apos;re all set.</h3>
                    <p className="mt-2 text-sm text-[#465A60]">
                      We&apos;ll review what you shared and follow up with a real next step. If it&apos;s not a fit,
                      we&apos;ll tell you that directly.
                    </p>
                    <p className="mt-4 text-xs text-[#5C7076]">
                      Reminder: pre-qualification does not affect your credit score.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setSubmissionId(undefined);
                      setData({
                        creditSituation: "",
                        employmentStatus: "",
                        monthlyIncomeRange: "",
                        firstName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        vehicleType: "",
                        timeline: "",
                      });
                      setStep(1);
                    }}
                    className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-[#0F2027] border border-[rgba(15,32,39,0.18)] hover:border-[rgba(15,32,39,0.28)] bg-white/70 hover:bg-white transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Shared sub-components ---------- */

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className={[
        "inline-block w-2.5 h-2.5 rounded-full transition-colors",
        active ? "bg-[#7FD0B5]" : "bg-[rgba(15,32,39,0.18)]",
      ].join(" ")}
    />
  );
}

function Field({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["grid gap-2", className].filter(Boolean).join(" ")}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-[#0F2027]">{children}</label>;
}

function Input({
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className="w-full rounded-xl border border-[rgba(15,32,39,0.16)] bg-white px-4 py-3 text-sm text-[#0F2027] placeholder:text-[#7F9CA3] focus:outline-none focus:ring-2 focus:ring-[rgba(127,208,181,0.55)] focus:border-[rgba(127,208,181,0.65)]"
    />
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={[
        "w-full rounded-xl border border-[rgba(15,32,39,0.16)] bg-white px-4 py-3 text-sm",
        "text-[#0F2027] focus:outline-none focus:ring-2 focus:ring-[rgba(127,208,181,0.55)] focus:border-[rgba(127,208,181,0.65)]",
      ].join(" ")}
    >
      <option value="">{placeholder}</option>
      {options
        .filter((o) => o !== "")
        .map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
    </select>
  );
}

function OptionCards<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={[
            "px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-150 cursor-pointer",
            value === opt
              ? "bg-[#0F2027] text-[#7FD0B5] border-[#7FD0B5] shadow-[0_0_12px_rgba(127,208,181,0.25)]"
              : "bg-white border-[rgba(15,32,39,0.16)] text-[#0F2027] hover:border-[#7FD0B5] hover:bg-[rgba(127,208,181,0.06)]",
          ].join(" ")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
