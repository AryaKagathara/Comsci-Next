import Head from "next/head";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

const DynamicIframe = dynamic(() => Promise.resolve(({ children }) => {
  return (
    <iframe
      src="https://app.formbricks.com/s/clutpyviv0bfdekwq1il46zje"
      frameBorder="0"
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', border: 0 }}
      title="Contact Us Form"
    >
      {children}
    </iframe>
  );
}), { ssr: false });

export default function Contact() {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    title: "Contact Us | Comsci Technologies - Software Development",
    description: "Get in touch with Comsci Technologies to discuss your software development project. We offer solutions in web design, mobile apps, branding, AI, and more.", // Updated description
    og: {
      title: "Contact Comsci Technologies",
      description: "Ready to start your next software project? Contact Comsci Technologies today for a consultation.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Comsci Technologies - Let's Build Together",
      description: "Reach out to Comsci Technologies to discuss web, mobile, AI, or branding projects. Let's connect!",
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
      "name": "Contact Form",
      "description": "Use the embedded form to send us a message.",
      "url": "https://app.formbricks.com/s/clutpyviv0bfdekwq1il46zje"
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
      <div style={{ position: 'relative', height: '80vh', overflow: 'auto', backgroundColor: '#ffffff', margin: '0' }}>
        <DynamicIframe />
      </div>
    </>
  );
}