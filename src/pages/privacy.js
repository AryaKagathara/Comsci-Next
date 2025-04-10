import Head from "next/head";
import PrivacyPage from "@/components/layout/PrivacyPage";
import metaData from '../files/meta.json'; // Import your default meta data
import breadcrumbData from '../files/breadcrumbs.json';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';

export default function Privacy() {

  const router = useRouter();
      
        const currentPath = router.pathname;
        const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Privacy Policy | Comsci Technologies",
    description: "Comsci Technologies is committed to protecting your privacy. Learn how we collect, use, and safeguard your personal information.",  // Clear and concise
    og: {
        title: "Comsci Technologies Privacy Policy",  // More formal title
        description: "Your privacy matters. Read our comprehensive privacy policy to understand our data practices and your rights.", // Detailed description for social sharing
      },
    robots: "noindex, nofollow", // Important: Tell search engines NOT to index this page.  
   
  };



  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };

    // It's unlikely you'll need Open Graph or Twitter data for a Privacy Policy

    if (customMeta.og) {
      mergedMeta.og = { ...metaData.og, ...customMeta.og };
    }


    return Object.keys(mergedMeta).map((key) => {
      if (key === "title") {
          return <title key={key}>{mergedMeta[key]}</title>;
      }
      if (key === "og") { // Keep the OG data in case it's needed.
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
      <Breadcrumb items={breadcrumbItems} />
      <PrivacyPage />
    </>
  );
}