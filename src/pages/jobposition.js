import Head from "next/head";
import JobpageSection from "@/components/JobpageSection";
import metaData from '../files/meta.json'; // Import default meta data
import breadcrumbData from '../files/breadcrumbs.json';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';

export default function JobPosition() {

  const router = useRouter();
      
        const currentPath = router.pathname;
        const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

    const customMeta = {
        title: "Job Openings | Careers at Comsci Technologies", // Clear and concise title
        description: "Explore current job opportunities at Comsci Technologies and join our team of talented software developers, designers, and engineers.",
        og: {
            title: "Join Our Team! | Comsci Technologies Careers", // Engaging title for social media
            description: "We're hiring! Discover exciting career opportunities at Comsci Technologies and help us build innovative software solutions.",
        },
        twitter: {
            card: "summary_large_image",
            title: "Careers at Comsci Technologies - Now Hiring!",
            description: "Find your dream job in software development, design, and engineering at Comsci Technologies. Apply today!", // Tailored for Twitter
        },
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
                return Object.keys(mergedMeta[key]).map((property) => (
                   <meta key={`${key}:${property}`} property={`${key}:${property}`} content={mergedMeta[key][property]} />
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
      <JobpageSection />
    </>
  );
}