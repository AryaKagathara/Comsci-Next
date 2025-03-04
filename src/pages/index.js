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
import metaData from '../files/meta.json';

export default function Home() {

  const customMeta = {
  };

  const getMetaTags = (metaData, customMeta = {}) => {

    const mergedMeta = { ...metaData, ...customMeta };

    //handle nested og and twitter objects to override and merge correctly
    if (customMeta.og) {
      mergedMeta.og = { ...metaData.og, ...customMeta.og }
    }
    if (customMeta.twitter) {
      mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter }
    }


    return Object.keys(mergedMeta).map((key) => {
      if (key === "title") {
        return <title key={key}>{mergedMeta[key]}</title>;
      }


      if (key === "og" || key === "twitter") {
        return Object.keys(mergedMeta[key]).map((property) => (
          <meta
            key={`${key}:${property}`}
            property={`${key}:${property}`}
            content={mergedMeta[key][property]}
          />
        ));
      }
      return <meta key={key} name={key} content={mergedMeta[key]} />;
    });
  };

  return (
    <>
      <Head>
        {getMetaTags(metaData, customMeta)}
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