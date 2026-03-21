import Hero from "@/components/sections/Hero";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import Services from "@/components/sections/Services";
import WhyEdShoots from "@/components/sections/WhyEdShoots";
import About from "@/components/sections/About";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import Testimonials from "@/components/sections/Testimonials";
import ClientTrust from "@/components/sections/ClientTrust";
import Inquiry from "@/components/sections/Inquiry";
import Subscribe from "@/components/sections/Subscribe";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <Services />
      <WhyEdShoots />
      <About />
      <BehindTheScenes />
      <Testimonials />
      <ClientTrust />
      <Inquiry />
      <Subscribe />
      <WhatsAppButton />
    </>
  );
}
