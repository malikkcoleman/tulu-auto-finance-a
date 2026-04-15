"use client";

import { useEffect, useState } from "react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const applySection = document.getElementById("apply");
      if (!applySection) return;
      const rect = applySection.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="bg-[#0F2027]/95 backdrop-blur-lg border-t border-[rgba(127,208,181,0.15)] shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.5)] px-4 py-3">
        <a
          href="#apply"
          className="flex items-center justify-center w-full bg-gradient-to-br from-[#7FD0B5] to-[#5BA4D9] hover:from-[#8DD8BF] hover:to-[#6DB1E0] text-[#0F2027] font-bold text-base py-3.5 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(127,208,181,0.3),0_0_0_3px_rgba(127,208,181,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(127,208,181,0.25)]"
        >
          Check If You Qualify
        </a>
        <p className="text-center text-xs text-[#7F9CA3] mt-1.5">
          Takes 2 minutes
        </p>
      </div>
    </div>
  );
}
