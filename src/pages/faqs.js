import Head from "next/head";
import Faqsection from "@/components/layout/Faqsection";
import metaData from '../files/meta.json'; // Import your default meta data

export default function Faqs() {
  const customMeta = {
    title: "Frequently Asked Questions | Comsci Technologies",
    description: "Find answers to common questions about Comsci Technologies, our services, processes, and more.  If you don't see your question here, contact us!",
    og: {
      title: "Comsci FAQs - Your Questions Answered",
      description: "Get quick answers to frequently asked questions about software development, web design, and working with Comsci Technologies.",
    },
      twitter: {
          title: "Your Questions, Answered: Comsci FAQs",  // Customize the Twitter title
          description: "Have questions about Comsci Technologies and our services? Find answers to frequently asked questions here.",  // Customize Twitter description
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
      <Faqsection />
    </>
  );
}