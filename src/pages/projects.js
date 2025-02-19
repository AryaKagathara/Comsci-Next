import Head from "next/head";
import ProjectPage from "@/components/ProjectPage";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import metaData from '../files/meta.json'; // Import your default meta data


export default function Projects() {
  const customMeta = {
    title: "Our Projects | Comsci Technologies - Software Development Portfolio", // More descriptive title
    description: "Explore Comsci Technologies' portfolio of successful software development projects. Discover innovative solutions we've delivered across various industries.", // More compelling description
    og: {
      title: "Comsci's Project Portfolio: Showcasing Innovation",  // Customize OG title
      description: "See how Comsci Technologies transforms businesses with cutting-edge software solutions. Explore our project portfolio for inspiration and results.", // Customize OG description
    },
    twitter: {
      card: "summary_large_image", // Use the appropriate card type for visual impact
      title: "Comsci's Portfolio: Inspiring Software Solutions", // Customize the Twitter title
    },

  };

  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };


    if (customMeta.og) {
      mergedMeta.og = { ...metaData.og, ...customMeta.og };
    }
    if (customMeta.twitter) {
      mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter }
    }


    return Object.keys(mergedMeta).map((key) => {

      if (key === "title") {
        return <title key={key}>{mergedMeta[key]}</title>;
      }

      if (key === "og" || key === "twitter") {
        return Object.keys(mergedMeta[key]).map((property) => {
           return <meta key={`${key}:${property}`} property={`${key}:${property}`} content={mergedMeta[key][property]} />;
        });
      }
      return <meta key={key} name={key} content={mergedMeta[key]} />;


    });
  };

  return (
    <>
      <Head>
        {getMetaTags(metaData, customMeta)}
      </Head>
      <ProjectPage />
      <TestimonialsSection />
      <TestiMonialsSlider />
    </>
  );
}