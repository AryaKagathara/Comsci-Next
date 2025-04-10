import Head from "next/head";
import BlogpageSection from "@/components/BlogpageSection";
import metaData from '../files/meta.json'; // Import your default meta data
import breadcrumbData from '../files/breadcrumbs.json';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';

export default function Blogs() {

  const router = useRouter();

  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];
        
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
      <Breadcrumb items={breadcrumbItems} />
      <BlogpageSection />
    </>
  );
}