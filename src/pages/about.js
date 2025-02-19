import Head from "next/head";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ResultSection from "@/components/ResultSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import Awards from "@/components/Awards";
import RendomLogo from "@/components/RendomLogo";
import metaData from '../files/meta.json';

export default function About() {

  const customMeta = {
    "title": "About Us - Comsci: Your Trusted Design & Development Partner",
    "description": "Learn about Comsci's mission, values, and team of expert designers and developers. Discover how we help businesses evolve.",
    "keywords": [
       "about comsci", "company history", "team", "mission", "values", "design agency", "development company"
    ],
    "robots": "index, follow",
    "author": "Comsci"
  };

  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };
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
      <AboutSection />
      <Awards />
      <RendomLogo />
      {/* <TeamSection /> */}
      <ResultSection />
      <TestimonialsSection />
      <TestiMonialsSlider />
    </>
  )
}