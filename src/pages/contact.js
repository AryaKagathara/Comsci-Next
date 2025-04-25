import Head from "next/head";
import { useRouter } from 'next/router';
import Script from 'next/script';
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';
import breadcrumbData from '../files/breadcrumbs.json';
import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Contact() {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Schedule a Meeting | Comsci Technologies - Software Development", // Updated title
    description: "Schedule a meeting with Comsci Technologies to discuss your software development project. Let's talk about web design, mobile apps, branding, AI, and more.", // Updated description
    og: {
      title: "Schedule a Meeting with Comsci Technologies", // Updated OG title
      description: "Ready to start your next software project? Book a time with Comsci Technologies today for a consultation.", // Updated OG description
    },
    twitter: {
      card: "summary_large_image",
      title: "Schedule Meeting - Comsci Technologies", // Updated Twitter title
      description: "Book a meeting with Comsci Technologies to discuss web, mobile, AI, or branding projects. Let's connect!", // Consistent Twitter description
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
    "@type": "ContactPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": currentPageMeta.title,
    "description": currentPageMeta.description,
    "isPartOf": {
      "@id": websiteSchema["@id"]
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "name": "Scheduling Widget",
      "description": "Use the embedded Calendly widget to schedule a meeting with us.",
      "url": "https://calendly.com/aryakagathara/meeting"
    },
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

  const calendlyUrl = "https://calendly.com/aryakagathara/meeting?hide_gdpr_banner=1";

  return (
    <>
      <Head>
        {getMetaTags(baseMetaData, customMeta)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
          key="jsonld-schema"
        />
        <link rel="preconnect" href="https://assets.calendly.com" />
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <div style={{ backgroundColor: '#ffffff', margin: '2rem 0' }}>
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: '320px', height: '700px' }}
        ></div>
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}