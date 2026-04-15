import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import FormSection from "@/components/landing/FormSection";
import SecondCTA from "@/components/landing/SecondCTA";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import MobileCTA from "@/components/landing/MobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Benefits />
      <FormSection />
      <SecondCTA />
      <FAQ />
      <Footer />
      <MobileCTA />
    </>
  );
}
