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

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Contact Us | Comsci - Design & Development Inquiry",
    description: "Ready to start your next project? Contact Comsci, a global design & development agency. Discuss needs for web, app, branding, AI & custom software.",
    keywords: [
      "contact comsci", "comsci technologies contact", "get in touch design agency", "contact us web development", "app development inquiry", "request a quote digital agency", "software project contact", "branding services contact", "contact form design company", "inquire about services", "talk to design experts", "global agency contact"
    ],
    og: {
      title: "Contact Comsci: Start Your Digital Project",
      description: "Ready to start your next software project? Book a time with Comsci Technologies today for a consultation.",
      url: pageUrl,
    },
    twitter: {
      title: "Contact Comsci: Start Your Digital Project",
      description: "Book a meeting with Comsci Technologies to discuss web, mobile, AI, or branding projects. Let's connect!",
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
        <link rel="canonical" href={pageUrl} key="canonical-link" />
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