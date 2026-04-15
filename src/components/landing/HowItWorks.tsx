const steps = [
  {
    number: "1",
    title: "Pre-Qualify",
    description:
      "Answer a few basics in about 2 minutes. Quick, simple, and completely private.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Get a Real Answer",
    description:
      "If it looks like a fit, we\u2019ll reach out with what you\u2019ll need next \u2014 and what to expect.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Choose Your Vehicle",
    description:
      "If you qualify, we\u2019ll help you line up a vehicle option that fits your budget and timeline.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-1.036-.84-1.875-1.875-1.875H17.25M16.5 6.75V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25v1.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#132D38] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F4F7F6]">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[#AFC3C7] max-w-xl mx-auto">
            A quick pre-qualification — then clear next steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-[#1A2E36] rounded-2xl p-8 text-center border border-[rgba(127,208,181,0.15)] transition-all duration-250 hover:-translate-y-1.5 hover:bg-[#213B44] hover:border-[rgba(127,208,181,0.3)] hover:shadow-[0_18px_50px_-30px_rgba(127,208,181,0.25)]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#213B44] text-[#7FD0B5] mb-6">
                {step.icon}
              </div>
              <div className="absolute top-6 right-6 text-5xl font-black text-[#213B44]">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#F4F7F6]">{step.title}</h3>
              <p className="mt-3 text-[#AFC3C7] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#apply"
            className="inline-block bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.25),0_0_0_3px_rgba(127,208,181,0.25),0_16px_40px_-20px_rgba(127,208,181,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.3),0_16px_40px_-20px_rgba(127,208,181,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.25)]"
          >
            Check If You Qualify
          </a>
        </div>
      </div>
    </section>
  );
}
