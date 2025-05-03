import Head from "next/head";
import { useRouter } from 'next/router';
import PrivacyPage from "@/components/layout/PrivacyPage";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Privacy() {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Comsci | Website Privacy Policy & Data Practices",
    description: "Read Comsci's Privacy Policy. Learn how we collect, use, and protect your personal information on our website and safeguard your data with us.",
    keywords: [
      "comsci privacy policy",
      "website privacy policy",
      "data protection policy",
      "personal data usage",
      "online privacy practices",
      "comsci data",
      "information security policy",
      "legal privacy policy",
      "digital privacy policy",
      "how comsci uses data"
    ],
    og: {
      title: "Comsci Technologies Privacy Policy",
      description: "Your privacy matters. Read our comprehensive privacy policy to understand our data practices and your rights.",
      url: pageUrl,
    },
    twitter: {
      title: "Comsci Technologies Privacy Policy",
      description: "Your privacy matters. Read our comprehensive privacy policy to understand our data practices and your rights.",
      url: pageUrl,
    },
    robots: "noindex, nofollow",
    author: "Comsci - Arya Kagathara",
  };

  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };

    if (mergedMeta.twitter) delete mergedMeta.twitter.card;
    if (customMeta.og) mergedMeta.og = { ...metaData.og, ...customMeta.og };

    return Object.keys(mergedMeta).map((key) => {
      if (key === "title") return <title key={key}>{mergedMeta[key]}</title>;

      if (key === "robots") return <meta key={key} name="robots" content={mergedMeta[key]} />;

      if (key === "og") {
        return Object.keys(mergedMeta[key]).map((property) => (
          <meta key={`${key}:${property}`} property={`${key}:${property}`} content={mergedMeta[key][property]} />
        ));
      }

      if (key === "keywords" && Array.isArray(mergedMeta[key])) {
        return <meta key={key} name={key} content={mergedMeta[key].join(', ')} />;
      }

      if (key !== 'twitter' && key !== 'og' && key !== 'title' && key !== 'keywords' && typeof mergedMeta[key] === 'string') {
        return <meta key={key} name={key} content={mergedMeta[key]} />;
      }
      return null;
    });
  };

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
        <link rel="canonical" href={pageUrl} key="canonical-link" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
          key="jsonld-schema"
        />
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <PrivacyPage /> {/* Your component displaying the privacy policy text */}
    </>
  );
}

