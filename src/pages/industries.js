import Head from "next/head";
import IndustriesPage from "@/components/IndustriesPage";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";
import metaData from '../files/meta.json'; // Import your default meta data
import breadcrumbData from '../files/breadcrumbs.json';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';

export default function Industries() { // Function name should match filename (Industries)

      const router = useRouter();
    
      const currentPath = router.pathname;
      const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Industries We Serve | Comsci Technologies - Software Solutions", // More specific title
    description: "Comsci Technologies provides tailored software solutions across diverse industries, including Healthcare, Fintech, and more.  Explore our expertise and see how we can help your business thrive.", // Improved, more specific description
    og: {
        title: "Comsci: Industry-Specific Software Solutions",
        description: "We empower businesses across various industries with custom software designed to meet their unique challenges and achieve growth.",     
    },
    twitter: {
      title: "Software Solutions for Every Industry - Comsci", // Customize
      description: "Comsci Technologies delivers tailored software solutions for leading industries.  Discover how we can transform your business.",  // Customize
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
        if(key === "og" || key === "twitter"){
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
      <Breadcrumb items={breadcrumbItems} />
      <IndustriesPage />
      <ServicesSection />
      <Technologies />
    </>
  );
}