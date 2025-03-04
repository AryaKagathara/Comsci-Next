import Head from "next/head";
import metaData from '../files/meta.json'; // Import your default meta data
import ContentBox from "@/components/layout/ContentBox";
import dynamic from 'next/dynamic';

const DynamicIframe = dynamic(() => Promise.resolve( ({ children }) => {
  return (
    <iframe
      src="https://app.formbricks.com/s/clutpyviv0bfdekwq1il46zje"
      frameBorder="0"
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', border: 0 }}
    >
        {children}
    </iframe>
  );
}), { ssr: false });


export default function Contact() {
  const customMeta = {
    title: "Contact Us | Comsci Technologies - Software Development", // More descriptive title
    description: "Explore Comsci Technologies for successful software development projects. Discover innovative solutions we've delivered across various industries.", // More compelling description
    og: {
      title: "Comsci Technologies ",  // Customize OG title
      description: "See how Comsci Technologies transforms businesses with cutting-edge software solutions. Contact us now.", // Customize OG description
    },
    twitter: {
      card: "summary_large_image", // Use the appropriate card type for visual impact
      title: "Comsci Technologies - Contact Us: Inspiring Software Solutions", // Customize the Twitter title
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
      <div style={{ position: 'relative', height: '80vh', overflow: 'auto', backgroundColor: '#ffffff', margin: '60px 0' }}>
        <DynamicIframe />
      </div>
        </>
    );
}