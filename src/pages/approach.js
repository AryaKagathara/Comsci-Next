import Head from "next/head";
import { useRouter } from 'next/router';
import ServicesSection from "@/components/layout/ServicesSection";
import StrategySection from "@/components/layout/StrategySection";
import Technologies from "@/components/layout/Technologies";
import ProjectSection from "@/components/ProjectSection";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Approach() {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Comsci's Approach: Delivering Results Through Strategic Software Development",
    description: "Discover how Comsci's proven 5-step approach, from strategy to delivery, ensures your software project achieves measurable results. We combine creative design, technical expertise, and rigorous testing for successful outcomes.",

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
    "@type": "WebPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": currentPageMeta.title,
    "description": currentPageMeta.description,
    "isPartOf": {
      "@id": websiteSchema["@id"]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
          key="jsonld-schema"
        />
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <StrategySection /> {/* Component displaying your approach */}
      <ProjectSection />
      <ServicesSection />
      <Technologies />
    </>
  );
}

