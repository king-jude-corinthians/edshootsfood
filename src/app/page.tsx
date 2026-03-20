import Hero from "@/components/sections/Hero";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Inquiry from "@/components/sections/Inquiry";
import Subscribe from "@/components/sections/Subscribe";
import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <About />
      <Services />
      <Testimonials />
      <Inquiry />
      <Subscribe />
      <ChatWidget />
    </>
  );
}
