"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0F2027]/80 backdrop-blur-xl border-b border-[rgba(127,208,181,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border-2 border-dashed border-[rgba(127,208,181,0.3)] flex items-center justify-center text-[#7FD0B5] text-xs font-bold">
            T
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-[#F4F7F6]">Tulu</span>
            <span className="text-lg text-[#7F9CA3]">Auto Finance</span>
          </div>
        </div>

        <a
          href="#apply"
          className="hidden md:inline-flex items-center justify-center bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_0_25px_rgba(127,208,181,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.25)]"
        >
          Check If You Qualify
        </a>
      </div>
    </header>
  );
}
