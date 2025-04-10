import Head from 'next/head';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import metaData from '../../files/meta.json';
import breadcrumbData from '../../files/breadcrumbs.json';
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';

import baseMetaData from '../../files/meta.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../../lib/commonSchema';

export async function getStaticPaths() {
  const industries = require('../../files/industries.json');
  const paths = industries.map(industry => ({
    params: { id: industry.link },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const industries = require('../../files/industries.json');
  const industry = industries.find(i => i.link === params.id);

  if (!industry) {
    return { notFound: true };
  }

  return { props: { industry } };
}

export default function IndustryDetail({ industry }) {
  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathSegments = router.pathname.split('/').filter(Boolean);
    let parentPath = '/';
    if (pathSegments.length > 1) {
      parentPath = '/' + pathSegments.slice(0, -1).join('/');
    }
    const parentBreadcrumbs = breadcrumbData[parentPath];

    if (parentBreadcrumbs && industry?.title && router.asPath) {
      const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
      const currentIndustryItem = {
        label: industry.title,
        name: industry.title,
        href: router.asPath
      };
      itemsCopy.push(currentIndustryItem);
      setBreadcrumbItems(itemsCopy);
    } else {
      setBreadcrumbItems(breadcrumbData['/'] || []);
    }
  }, [router.pathname, router.asPath, industry?.title]);

  if (!industry) {
    return <div>Industry details not found.</div>;
  }

  const fullSocialImageUrl = industry.fullImage ? (industry.fullImage.startsWith('http') ? industry.fullImage : `${BASE_URL}${industry.fullImage}`) : `${BASE_URL}/images/social-share-og/Facebook.webp`;
  const customMeta = {
    title: `${industry.title} Industry Solutions | Comsci`,
    description: industry.description,
    keywords: industry.keywords || [],
    og: {
      title: `${industry.title} Industry Solutions | Comsci`,
      description: industry.description,
      image: fullSocialImageUrl,
      imageAlt: `Comsci's expertise in the ${industry.title} Industry`,
    },
    twitter: {

      title: `${industry.title} Industry Solutions | Comsci`,
      description: industry.description,
      image: fullSocialImageUrl,
      imageAlt: `Comsci's expertise in the ${industry.title} Industry`,
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
      if (key === "robots") return <meta key={key} name="robots" content={mergedMeta[key]} />;

      if (key !== 'og' && key !== 'twitter' && key !== 'title' && key !== 'keywords' && typeof mergedMeta[key] === 'string') {
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
    },

    "about": {
      "@type": "Thing",
      "name": industry.title
    },

    "keywords": industry.keywords ? industry.keywords.join(', ') : undefined,

    "image": industry.fullImage ? (industry.fullImage.startsWith('http') ? industry.fullImage : `${BASE_URL}${industry.fullImage}`) : undefined,

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
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
        "name": item.name || item.label,
        "item": item.href.startsWith('/') ? `${BASE_URL}${item.href}` : item.href
      }))
    };
  }

  const finalSchema = [
    organizationSchema,
    websiteSchema,
    pageSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : [])
  ];

  const renderContent = (content) => {
    if (!Array.isArray(content)) {

      return (typeof content === 'string') ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : null;
    }

    return content.map((item, index) => {
      if (!item || !item.tag) return null;

      switch (item.tag) {
        case 'ul':
        case 'ol':
          if (!Array.isArray(item.content)) return null;
          const listItems = item.content.map((listItem, listIndex) => {

            if (!listItem || typeof listItem.content !== 'string') return null;
            return <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>;
          }).filter(Boolean);
          return React.createElement(item.tag, { key: index }, listItems);
        case 'img':
          const width = item.width || 768;
          const height = item.height || 432;
          const altText = typeof item.alt === 'string' ? item.alt : (typeof item.content === 'string' ? item.content : `Industry Content Image ${index + 1}`);
          return item.src ? (
            <div className="image" key={index} style={{ position: 'relative', width: '100%', maxWidth: `${width}px`, height: 'auto', margin: '20px 0' }}>
              <Image src={item.src} alt={altText} width={width} height={height} style={{ width: '100%', height: 'auto' }} quality={90} priority={index < 2} />
            </div>
          ) : null;
        case 'iframe':
          return item.src ? (
            <div className="video-embed" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000', margin: '20px 0' }}>
              <iframe src={item.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allowFullScreen title={`Embedded Content ${index + 1}`}></iframe>
            </div>
          ) : null;
        default:
          return (typeof item.content === 'string') ? React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } }) : null;
      }
    }).filter(Boolean);
  };

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

      {/* Industry Detail Banner - Make sure image path is correct */}
      {industry.fullImage && (
        <div className="industrie_detail_banner">
          <div className="detail_img_block" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Use fill layout or fixed dimensions - ensure responsiveness */}
            <Image src={industry.fullImage} alt={industry.title} quality={90} layout="fill" objectFit="cover" priority />
          </div>
        </div>
      )}

      {/* Industry Detail Content Section */}
      <div className="industries_detail_section" style={{ padding: '40px 0' }}>
        <div className="container">
          {/* Add a clear heading for the content */}
          {/* <h1>{industry.title} Solutions</h1> Optionally render title again */}
          <div className="industrie_wrap_sec">
            {renderContent(industry.content)}
          </div>
        </div>
      </div>
    </>
  );
}