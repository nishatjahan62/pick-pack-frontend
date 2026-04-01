import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import Navbar from "@/components/layout/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
       <Features />
       <Stats/>
         <HowItWorks />
         <Testimonials />
            <CTA />
    
      <Footer />
    </div>
  )
}