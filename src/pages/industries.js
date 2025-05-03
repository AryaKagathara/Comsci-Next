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

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Comsci | Industries Served - Tailored Digital Solutions",
    description: "Explore industries Comsci serves: Healthcare, Web3, Real Estate, Fintech & more. Get tailored web, app & software solutions to help your business thrive globally.",
    keywords: [
      "comsci industries served", "industries digital agency", "tech solutions by industry", "healthcare software solutions", "web3 development company", "real estate tech solutions", "ecommerce development agency", "fintech software company", "digital transformation by sector", "industry specific software", "tailored tech solutions", "digital services by industry"
    ],
    og: {
      title: "Industries We Serve | Comsci",
      description: "See how Comsci provides tailored web, app, and software solutions across various industries. Partner for business success.",
      url: pageUrl,
    },
    twitter: {
      title: "Industries We Serve | Comsci",
      description: "See how Comsci provides tailored web, app, and software solutions across various industries. Partner for business success.",
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