import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import DashboardPreview from "../components/landing/DashboardPreview";

function LandingPage() {
  return (
    <div className="bg-[#0B1220] text-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;