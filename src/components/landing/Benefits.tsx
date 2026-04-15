const benefits = [
  {
    title: "Simple, fast pre-qualification",
    description:
      "Start with a few basics. If it looks like a fit, we\u2019ll ask for details and tell you what happens next.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "You stay in control",
    description:
      "Nothing happens without your explicit consent. A full credit inquiry only follows if you choose to move forward.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Nationwide coverage",
    description:
      "We work across Canada. If you qualify, we\u2019ll help line up options that fit your needs and budget.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-1.036-.84-1.875-1.875-1.875H17.25M16.5 6.75V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25v1.5" />
      </svg>
    ),
  },
  {
    title: "Straight answers",
    description:
      "Not everyone qualifies. We\u2019ll be transparent about what\u2019s realistic and what we\u2019d need to move forward.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#0F2027] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F7F6]">
            What to Expect
          </h2>
          <p className="mt-4 text-lg text-[#AFC3C7] max-w-xl mx-auto">
            Honest guidance, clear next steps, and no exaggerated promises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-5 p-6 rounded-2xl bg-[#1A2E36] border border-[rgba(127,208,181,0.15)] transition-all duration-250 hover:-translate-y-1.5 hover:bg-[#213B44] hover:border-[rgba(127,208,181,0.3)] hover:shadow-[0_18px_50px_-30px_rgba(127,208,181,0.25)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#213B44] text-[#7FD0B5] flex items-center justify-center">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F4F7F6]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[#AFC3C7] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
