import Head from "next/head";
import { useRouter } from 'next/router';
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import allData from '../files/services.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function ServicesPage({ servicesData }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Comsci | Full Digital Design & Development Services",
    description: "Explore Comsci's digital design & development services. Get bespoke web, app, software, branding, AI & SEO solutions driving measurable results.",
    keywords: [
      "comsci services",
      "design development services",
      "web design services",
      "mobile app development services",
      "custom software development",
      "branding services",
      "ux ui design services",
      "artificial intelligence services",
      "seo services digital",
      "video production services",
      "digital agency services",
      "full service digital agency"
    ],
    og: {
      title: "Comsci Digital Services - Web, App, AI, Branding & More",
      description: "Elevate your business with Comsci's expert services in web, mobile, software, branding, and AI solutions.",
      url: pageUrl,
    },
    twitter: {
      title: "Comsci Digital Services - Web, App, AI, Branding & More",
      description: "Elevate your business with Comsci's expert services in web, mobile, software, branding, and AI solutions.",
      url: pageUrl,
    },
    author: "Comsci - Arya Kagathara"
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
      "itemListElement": servicesData.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": service.metatitle,

        "url": `${BASE_URL}/services/${service.link}`
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
      {/* Pass servicesData to your component that renders the list */}
      <ServicesSection services={servicesData} />
      <Technologies />
    </>
  );
}

export async function getStaticProps() {

  const servicesData = allData.services;

  return {
    props: {
      servicesData,
    },
  };
}