import Head from "next/head";
import { useRouter } from 'next/router';
import Faqsection from "@/components/layout/Faqsection";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import allFaqsData from '../files/faqs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Faqs({ faqsData }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Comsci | FAQs About Design & Development Services",
    description: "Get answers to frequently asked questions about Comsci. Find details on our design & development services, process, pricing, & how we partner globally.",
    keywords: [
      "comsci faqs", "frequently asked questions agency", "design agency faq", "development agency faq", "web design faq", "app development faq", "software development faq", "digital agency faq", "comsci process", "how does comsci work", "digital project questions", "comsci pricing"
    ],
    og: {
      title: "Comsci FAQs: Design & Development Questions Answered",
      description: "Find answers to frequently asked questions about Comsci Technologies and our web, app, and branding services.",
      url: pageUrl,
    },
    twitter: {
      title: "Comsci FAQs: Design & Development Questions Answered",
      description: "Find answers to frequently asked questions about Comsci Technologies and our web, app, and branding services.",
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
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": currentPageMeta.title,
    "description": currentPageMeta.description,
    "isPartOf": {
      "@id": websiteSchema["@id"]
    },

    "mainEntity": faqsData.map((faqItem) => ({
      "@type": "Question",
      "name": faqItem.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faqItem.answer
      }
    }))
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
      {/* Pass faqsData to your component if it needs it for rendering */}
      <Faqsection faqs={faqsData} />
    </>
  );
}

export async function getStaticProps() {

  const faqsData = allFaqsData;

  return {
    props: {
      faqsData,
    },
  };
}