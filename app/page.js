import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
  
      <Hero />
       <Features />
       <Stats/>
         <HowItWorks />
         <Testimonials />
            <CTA />
    
    </div>
  )
}