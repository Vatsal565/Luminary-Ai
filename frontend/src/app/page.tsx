import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Work from "@/components/Work";
import BrandLogos from "@/components/Sponsors";

export default function Home() {
  return (
    <div className="bg-level-1">
      <Navbar />
      <Hero />
      <Work />
      <BrandLogos />
      <Footer />
    </div>
  );
}