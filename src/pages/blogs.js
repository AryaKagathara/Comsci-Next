import Head from "next/head";
import BlogpageSection from "@/components/BlogpageSection";
import metaData from '../files/meta.json'; // Import your default meta data


export default function Blogs() {
  const customMeta = {
    title: "Comsci Technologies Blog | Insights and Expertise in Software Development",  
    description: "Stay updated with the latest trends, insights, and expert advice on software development, web design, mobile app development, and more from the Comsci Technologies blog.",
  };


  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };

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
      <BlogpageSection />
    </>
  );
}