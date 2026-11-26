import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { GoldSpotlightSection } from '@/components/home/GoldSpotlightSection';
import { DiamondSpotlightSection } from '@/components/home/DiamondSpotlightSection';
import { EditorialBanners } from '@/components/home/EditorialBanners';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { BespokeEnquiryModal } from '@/components/modals/BespokeEnquiryModal';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#25231F] selection:bg-[#EADBCE] selection:text-[#4A252B]">
      {/* Primary Header with Category Navigation */}
      <Header />

      <main>
        {/* Cinematic Hero Slider */}
        <HeroSlider />

        {/* Hallmark & Diamond Certifications Trust Bar */}
        <TrustBar />

        {/* Visual Category Showcase Tiles */}
        <CategoryShowcase />

        {/* Curated Universes Collections Rail */}
        <FeaturedCollections />

        {/* Bestselling Jewellery Highlights */}
        <BestsellersSection />

        {/* 22K Pure Artisanal Gold Feature */}
        <GoldSpotlightSection />

        {/* Certified Solitaires & Diamonds Feature */}
        <DiamondSpotlightSection />

        {/* Full-width Luxury Editorial Banners */}
        <EditorialBanners />

        {/* Interactive Filterable New Arrivals */}
        <NewArrivalsSection />

        {/* The House of Praashi Heritage & Goldsmithing */}
        <BrandStorySection />

        {/* Patron Testimonials & Reviews */}
        <TestimonialsSection />

        {/* Social Patron Gallery */}
        <InstagramGallery />
      </main>

      {/* Luxury Footer & Newsletter */}
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <SearchModal />
      <BespokeEnquiryModal />
    </div>
  );
};
