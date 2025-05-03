import Head from "next/head";
import { useRouter } from 'next/router';
import JobpageSection from "@/components/JobpageSection";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function JobPosition({ jobsData = [] }) {
    const router = useRouter();
    const currentPath = router.pathname;
    const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

    const pageUrl = `${BASE_URL}${router.asPath}`;

    const customMeta = {
        title: "Comsci Careers | Join Our Design & Development Team",
        description: "Explore exciting job opportunities at Comsci! Join our talented team of design, development, and tech professionals. Apply now to build innovative digital solutions.",
        keywords: [
          "comsci jobs", "careers at comsci", "design development jobs", "web design careers", "mobile app developer jobs", "software engineer jobs", "tech company jobs india", "digital agency jobs", "it jobs rajkot", "creative agency careers", "join tech team", "job openings design dev"
        ],
        og: {
          title: "Comsci Careers - Explore Job Opportunities",
          description: "Ready to advance your career in tech? Explore current job openings and join the Comsci team.",
          url: pageUrl,
        },
        twitter: {
          title: "Comsci Careers - Explore Job Opportunities",
          description: "Ready to advance your career in tech? Explore current job openings and join the Comsci team.",
          url: pageUrl,
        },
        author: "Comsci - Arya Kagathara",
      };

    const getMetaTags = (metaData, customMeta = {}) => {
        const mergedMeta = { ...metaData, ...customMeta };
        if (customMeta.og) mergedMeta.og = { ...metaData.og, ...customMeta.og };
        if (customMeta.twitter) mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter };

        return Object.keys(mergedMeta).map((key) => {
            if (key === "title") return <title key={key}>{mergedMeta[key]}</title>;
            if (key === "og" || key === "twitter") {
                return Object.keys(mergedMeta[key]).map((property) => (
                    <meta key={`${key}:${property}`} property={`${key}:${property}`} content={mergedMeta[key][property]} />
                ));
            }
            if (key === "keywords" && Array.isArray(mergedMeta[key])) {
                return <meta key={key} name={key} content={mergedMeta[key].join(', ')} />;
            }
            if (typeof mergedMeta[key] === 'string') {
                return <meta key={key} name={key} content={mergedMeta[key]} />;
            }
            return null;
        });
    };

    const currentPageMeta = { ...baseMetaData, ...customMeta };

    const pageSchema = {

        "@type": "CollectionPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": currentPageMeta.title,
        "description": currentPageMeta.description,
        "isPartOf": {
            "@id": websiteSchema["@id"]
        },

        "mainEntity": {
            "@type": "ItemList",

            "itemListElement": jobsData.map((job, index) => ({
                "@type": "ListItem",
                "position": index + 1,

                "item": {
                    "@type": "JobPosting",

                    "@id": `${BASE_URL}/jobs/${job.slug || job.id}`,
                    "title": job.title,

                    "description": job.summary || job.description || currentPageMeta.description,
                    "datePosted": job.datePosted ? new Date(job.datePosted).toISOString() : new Date().toISOString(),

                    "employmentType": job.employmentType || "FULL_TIME",
                    "hiringOrganization": {
                        "@id": organizationSchema["@id"]
                    },
                    "jobLocation": {
                        "@type": "Place",

                        "address": job.location || {
                            "@type": "PostalAddress",
                            "streetAddress": organizationSchema.address.streetAddress,
                            "addressLocality": organizationSchema.address.addressLocality,
                            "addressRegion": organizationSchema.address.addressRegion,
                            "postalCode": organizationSchema.address.postalCode,
                            "addressCountry": organizationSchema.address.addressCountry
                        }
                    },

                    "url": `${BASE_URL}/jobs/${job.slug || job.id}`
                }
            }))
        }
    };

    let breadcrumbSchema = null;
    if (breadcrumbItems && breadcrumbItems.length > 0) {
        breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`
            }))
        };
    }

    const finalSchema = [
        organizationSchema,
        websiteSchema,
        pageSchema,
        ...(breadcrumbSchema ? [breadcrumbSchema] : [])
    ];

    return (
        <>
            <Head>
                {getMetaTags(baseMetaData, customMeta)}
                <link rel="canonical" href={pageUrl} key="canonical-link" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
                    key="jsonld-schema"
                />
            </Head>
            <Breadcrumb items={breadcrumbItems} />
            {/* Pass jobsData to your component if it renders the job list */}
            <JobpageSection jobs={jobsData} />
        </>
    );
}

export async function getStaticProps() {
    let jobsData = [];
    try {

        console.warn("Job data (jobs.json) not found or implemented yet for schema generation.");
    } catch (error) {
        console.error("Error loading job data:", error);
    }

    return {
        props: {
            jobsData,
        },
    };
}