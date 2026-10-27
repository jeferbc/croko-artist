import About from '@/components/About';
import AttributionCapture from '@/components/AttributionCapture';
import Faq from '@/components/Faq';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Formats from '@/components/Formats';
import GallerySection from '@/components/GallerySection';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import JsonLd from '@/components/JsonLd';
import QuickStart from '@/components/QuickStart';
import Testimonials from '@/components/Testimonials';
import UseCases from '@/components/UseCases';

export default function Home() {
  return (
    <>
      <JsonLd />
      <AttributionCapture />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <GallerySection />
        <Formats />
        <About />
        <UseCases />
        <Testimonials />
        <Faq />
        <QuickStart />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
