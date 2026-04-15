export default function Hero() {
  return (
    <section className="relative bg-[#0F2027] overflow-hidden pt-[72px]">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(127,208,181,0.12)] via-transparent to-[#0F2027] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[900px] h-[700px] bg-[rgba(127,208,181,0.22)] rounded-full blur-3xl pointer-events-none opacity-15" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[rgba(15,32,39,0.8)] rounded-full blur-3xl pointer-events-none" />

      {/* Centered radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(127,208,181,0.6), transparent)",
        }}
      />

      {/* Abstract decorative curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          d="M-100 600C200 350 500 700 800 400S1300 200 1540 450"
          stroke="#7FD0B5"
          strokeWidth="1.5"
        />
        <path
          d="M-50 200C300 450 600 100 900 350S1200 600 1500 300"
          stroke="#7FD0B5"
          strokeWidth="1"
        />
        <path
          d="M0 750C400 500 700 650 1100 500S1400 350 1440 550"
          stroke="#5BA4D9"
          strokeWidth="1"
        />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 lg:py-44">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — copy */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F4F7F6] leading-tight tracking-tight">
              See If You Qualify for a Car — Even with Bad Credit
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[#AFC3C7] max-w-xl leading-relaxed">
              Quick pre-qualification. No credit impact. Real answers in 2&nbsp;minutes.
            </p>

            <div className="mt-10">
              <a
                href="#apply"
                className="inline-block bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.3),0_0_0_3px_rgba(127,208,181,0.25),0_16px_40px_-20px_rgba(127,208,181,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.3),0_16px_40px_-20px_rgba(127,208,181,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.25)]"
              >
                Check If You Qualify
              </a>
              <p className="mt-4 text-xs text-[#7F9CA3]">
                Takes 2 minutes. No hard credit check.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-[#7F9CA3]">
              <TrustBadge icon="⚡" text="2-minute check" />
              <TrustBadge icon="✓" text="Real approvals" />
              <TrustBadge icon="🇨🇦" text="Canada-wide" />
            </div>
          </div>

          {/* Right — image placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-2xl border-2 border-dashed border-[rgba(127,208,181,0.25)] bg-[rgba(127,208,181,0.05)] flex flex-col items-center justify-center gap-4">
              <svg className="w-16 h-16 text-[rgba(127,208,181,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-1.036-.84-1.875-1.875-1.875H17.25M16.5 6.75V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25v1.5" />
              </svg>
              <span className="text-sm text-[rgba(127,208,181,0.4)] font-medium">
                Replace with real image
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curved wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          className="w-full h-[50px] md:h-[60px]"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 0 480 10 720 25C960 40 1200 50 1440 20V60H0Z"
            fill="#132D38"
          />
        </svg>
      </div>
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[#7FD0B5]">{icon}</span>
      {text}
    </span>
  );
}
