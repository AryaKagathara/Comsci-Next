import Head from "next/head";
import AboutSection from "@/components/AboutSection";
import ResultSection from "@/components/ResultSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import Awards from "@/components/Awards";
import RendomLogo from "@/components/RendomLogo";
import metaData from '../files/meta.json';
import BooksSection from "@/components/layout/BooksSection";

export default function Books() {

  const customMeta = {
    "title": "Downlaod Creative Books - Comsci: Your Trusted Design & Development Partner",
    "description": "Learn about Designing, Logo, Branding, Typography. Download free eBooks from Comsci Technologies.",
    "keywords": [
       "books comsci", "branding books", "logo design book", "typography books", "UX UI books", "design books", "visual concept books"
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
      <BooksSection />
    </>
  )
}