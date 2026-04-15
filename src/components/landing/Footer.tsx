export default function Footer() {
  return (
    <footer className="bg-[#0F2027] border-t border-[rgba(127,208,181,0.25)]">
      <div className="max-w-6xl mx-auto px-6 py-10 pb-28 md:pb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#F4F7F6]">Tulu</span>
            <span className="text-lg text-[#7F9CA3]">Auto Finance</span>
          </div>

          <nav className="flex gap-6 text-sm text-[#7F9CA3]">
            <a href="#" className="hover:text-[#F4F7F6] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#F4F7F6] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#F4F7F6] transition-colors duration-200">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(127,208,181,0.25)] text-center text-sm text-[#7F9CA3]">
          &copy; {new Date().getFullYear()} Tulu Auto Finance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
