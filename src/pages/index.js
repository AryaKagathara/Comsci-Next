import Head from "next/head";
import Banner from "@/components/layout/HomeBanner";
import ServicesSection from "@/components/layout/ServicesSection";
import Awards from "@/components/Awards";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import Technologies from "@/components/layout/Technologies";
import Faqsection from "@/components/layout/Faqsection";
import StrategySection from "@/components/layout/StrategySection";
import BlogSection from "@/components/BlogSection";
import ProjectSection from "@/components/ProjectSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import RendomLogo from "@/components/RendomLogo";
import AwardType from "@/components/AwardTypeSection";
import IndustriesSection from "@/components/IndustriesSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Comsci - Leading Design & Development Company | Elevate Your Business with Us</title>
        <meta name="description" content="Comsci - Unlock unparalleled design and development solutions for your business. Partner with us for award-winning services and agile processes. Explore our projects now!" key="desc" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" /> {/* Replace with your favicon path */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />  {/*If you have one */}


        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" /> {/* Replace with your website URL */}
        <meta property="og:title" content="Comsci - Leading Design & Development Company" />
        <meta property="og:description" content="Unlock unparalleled design and development solutions for your business." />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" /> {/* Replace with your OG image URL */}
        <meta property="og:image:alt" content="Comsci Logo or Image Description" />


        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://.com" /> {/* Replace with your website URL */}
        <meta property="twitter:title" content="Comsci - Leading Design & Development Company" />
        <meta property="twitter:description" content="Unlock unparalleled design and development solutions for your business." />
        <meta property="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" /> {/* Replace with your Twitter image URL */}        
        <meta name="twitter:image:alt" content="Comsci Logo or Image Description" />



        {/* Optional: Add other meta tags for specific platforms or purposes */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Comsci" />

      </Head>
      <Banner />
      <ServicesSection />
      <Awards />
      <AwardType />
      <RendomLogo />
      <TestiMonialsSlider />
      <StrategySection />
      <Technologies />
      <ProjectSection />
      <TestimonialsSection />
      <IndustriesSection />
      <Faqsection />
      <BlogSection />
    </>
  )
}