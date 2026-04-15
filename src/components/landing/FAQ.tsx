"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Will applying affect my credit score?",
    answer:
      "No. This pre-qualification does not trigger a hard credit check. A full credit inquiry would only happen with your explicit consent after you’ve reviewed the next steps.",
  },
  {
    question: "What credit score do I need?",
    answer:
      "There’s no single cutoff, but not everyone qualifies. We consider good, fair, poor, and no credit — and we’ll tell you honestly what’s realistic based on your situation.",
  },
  {
    question: "How fast can I get approved?",
    answer:
      "Pre-qualification is quick. If it looks like a fit, we’ll follow up with what we’d need next and a realistic timeline for an approval decision.",
  },
  {
    question: "What vehicles are available?",
    answer:
      "If you qualify, we’ll help match you with vehicle options (new or pre-owned) that fit your budget and timeline, working with dealerships across Canada.",
  },
  {
    question: "Do I need a down payment?",
    answer:
      "Not always. A down payment can help, but it depends on your situation and the lender. If you qualify, we’ll explain the options without pressure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#132D38] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F7F6]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-[#AFC3C7]">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="divide-y divide-[rgba(127,208,181,0.25)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
                >
                  <span className="text-base md:text-lg font-semibold text-[#F4F7F6] pr-4 group-hover:text-[#7FD0B5] transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-250 ${
                      isOpen ? "rotate-45 text-[#7FD0B5]" : "text-[#7F9CA3]"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#AFC3C7] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
