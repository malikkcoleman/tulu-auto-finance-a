export default function SecondCTA() {
  return (
    <section className="bg-[#0F2027] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#F4F7F6]">
          Get a Straight Answer in 2 Minutes
        </h2>
        <p className="mt-5 text-lg text-[#AFC3C7] max-w-2xl mx-auto leading-relaxed">
          This is a quick pre-qualification — not a commitment. Not everyone qualifies,
          but we&apos;ll tell you what&apos;s realistic and what the next step would be.
        </p>

        <div className="mt-10">
          <a
            href="#apply"
            className="inline-block bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_20px_rgba(127,208,181,0.3),0_0_0_3px_rgba(127,208,181,0.25),0_16px_40px_-20px_rgba(127,208,181,0.25)] hover:shadow-[0_0_25px_rgba(127,208,181,0.4),0_0_0_3px_rgba(127,208,181,0.3),0_16px_40px_-20px_rgba(127,208,181,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.25)]"
          >
            Check If You Qualify
          </a>
        </div>

        <p className="mt-6 text-sm text-[#7F9CA3]">
          Takes 2 minutes. Your credit stays untouched.
        </p>
      </div>
    </section>
  );
}
