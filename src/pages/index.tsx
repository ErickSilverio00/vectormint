import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import GallerySection from "@/components/gallery-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
