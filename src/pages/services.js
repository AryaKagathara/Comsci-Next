import Head from "next/head";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";
import metaData from '../files/meta.json';

export default function Services() {

  const customMeta = {
    "title": "Our Services - Comsci Design & Development Company",
    "description": "Explore Comsci's comprehensive design and development services: Web, Mobile, UX/UI, Branding, AI and more.  Drive measurable results for your business.",
    "keywords": [
      "web design", "web development", "mobile app development", "UI design", "UX design", "branding", "logo design", "SEO", "digital marketing", "AI development" // Add more relevant keywords
    ],
    "og": {
      "title": "Comsci - Design & Development Services",
      "description": "Elevate your business with our expert services in web, mobile, and AI solutions.",
    },
    "twitter": {
      "title": "Comsci - Design & Development Services",
      "description": "Elevate your business with our expert services in web, mobile, and AI solutions.",
    },
    "robots": "index, follow",
    "author": "Comsci"
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
      <ServicesSection />
      <Technologies />
    </>
  )
}