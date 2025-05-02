import Head from "next/head";
import { useRouter } from 'next/router';
import IndustriesPage from "@/components/IndustriesPage";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import allIndustriesData from '../files/industries.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Industries({ industriesData }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Industries We Serve | Comsci Technologies - Software Solutions",
    description: "Comsci Technologies provides tailored software solutions across diverse industries, including Healthcare, Fintech, and more. Explore our expertise and see how we can help your business thrive.",
    og: {
      title: "Comsci: Industry-Specific Software Solutions",
      description: "We empower businesses across various industries with custom software designed to meet their unique challenges and achieve growth.",
    },
    twitter: {
      title: "Software Solutions for Every Industry - Comsci",
      description: "Comsci Technologies delivers tailored software solutions for leading industries. Discover how we can transform your business.",
    },
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

  const pageUrl = `${BASE_URL}${router.asPath}`;
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
      "itemListElement": industriesData.map((industry, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": industry.title,

        "url": `${BASE_URL}/industries/${industry.link}`
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
      <IndustriesPage industries={industriesData} />
    </>
  );
}

export async function getStaticProps() {

  const industriesData = allIndustriesData;

  return {
    props: {
      industriesData,
    },
  };
}