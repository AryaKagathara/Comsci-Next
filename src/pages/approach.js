import Head from "next/head";
import ServicesSection from "@/components/layout/ServicesSection";
import StrategySection from "@/components/layout/StrategySection";
import Technologies from "@/components/layout/Technologies";
import ProjectSection from "@/components/ProjectSection";
import metaData from '../files/meta.json'; // Import your meta data

export default function Approach() {
  // Define custom meta data for the Approach page
  const customMeta = {
    title: "Comsci's Approach: Delivering Results Through Strategic Software Development",
    description: "Discover how Comsci's proven 5-step approach, from strategy to delivery, ensures your software project achieves measurable results. We combine creative design, technical expertise, and rigorous testing for successful outcomes.", 
  };


  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };

    // Handle nested og and twitter objects for merging
    if (customMeta.og) {
      mergedMeta.og = { ...metaData.og, ...customMeta.og };
    }
    if (customMeta.twitter) {
      mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter };
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
     // Default meta tags
     return <meta key={key} name={key} content={mergedMeta[key]} />;


    });
  };

  return (
    <>
      <Head>
         {getMetaTags(metaData, customMeta)} {/* Call the function to render meta tags */}     
      </Head>
      <StrategySection />
      <ProjectSection />
      <ServicesSection />
      <Technologies />
    </>
  );
}