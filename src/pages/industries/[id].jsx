import Head from 'next/head';
import Image from "next/image";
import React, { useEffect, useState } from 'react';

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
    
    if (!breadcrumbData || typeof breadcrumbData !== 'object') {
      console.error("Breadcrumb data is missing or not an object.");
      return;
    }

    const pathSegments = router.pathname.split('/').filter(Boolean);
    
    let parentPath = '/'; 
    if (pathSegments.length > 1) {
       
      parentPath = '/' + pathSegments.slice(0, -1).join('/');
    }
     
     const parentBreadcrumbs = breadcrumbData[parentPath] || breadcrumbData['/'] || [];

    let itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs)); 
    if (industry?.title && router.asPath) {
       const currentIndustryItem = {
          label: industry.title,
          name: industry.title, 
          href: router.asPath
       };
       
       if (!itemsCopy.find(item => item.href === router.asPath)) {
            itemsCopy.push(currentIndustryItem);
       }
    } else if (itemsCopy.length === 0) {
        
        if(industry?.title && router.asPath) {
             itemsCopy = [{ label: industry.title, name: industry.title, href: router.asPath }];
        }
    }

    setBreadcrumbItems(itemsCopy);

  }, [router.pathname, router.asPath, industry?.title, breadcrumbData]); 

  if (!industry) {
     
    return <div>Industry details not found.</div>;
  }

   const fullSocialImageUrl = industry.fullImage ?
    (industry.fullImage.startsWith('http') ? industry.fullImage : `${BASE_URL}${industry.fullImage}`)
    : `${BASE_URL}/images/social-share-og/Facebook.webp`; 

   const pageTitle = industry.meta_title || `${industry.title} Industry Solutions | Comsci`; 
   const pageDescription = industry.meta_description || industry.description || `Explore Comsci's software solutions for the ${industry.title} industry.`; 

   const pageKeywords = Array.isArray(industry.keywords) && industry.keywords.length > 0 ?
                        industry.keywords.join(', ') :
                        (typeof industry.keywords === 'string' && industry.keywords.length > 0 ? industry.keywords : ''); 

   const pageRobots = baseMetaData.robots || 'index, follow'; 
   const pageAuthor = baseMetaData.author || 'Comsci'; 
   const pageUrl = `${BASE_URL}${router.asPath}`; 

   const headMetaTags = [
      <title key="title">{pageTitle}</title>,
      <meta key="description" name="description" content={pageDescription} />,
      
       ...(pageKeywords ? [<meta key="keywords" name="keywords" content={pageKeywords} />] : []),
      <meta key="robots" name="robots" content={pageRobots} />,
      <meta key="author" name="author" content={pageAuthor} />,

      <meta key="og:title" property="og:title" content={pageTitle} />,
      <meta key="og:description" property="og:description" content={pageDescription} />,
      <meta key="og:type" property="og:type" content="website" />, 
      <meta key="og:url" property="og:url" content={pageUrl} />,
       ...(fullSocialImageUrl ? [<meta key="og:image" property="og:image" content={fullSocialImageUrl} />] : []),
       ...(industry.alt ? [<meta key="og:image:alt" property="og:image:alt" content={industry.alt} />] : []), 

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />, 
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />,
      <meta key="twitter:description" name="twitter:description" content={pageDescription} />,
      ...(fullSocialImageUrl ? [<meta key="twitter:image" name="twitter:image" content={fullSocialImageUrl} />] : []),
       ...(industry.alt ? [<meta key="twitter:image:alt" name="twitter:image:alt" content={industry.alt} />] : []), 

     <link rel="canonical" href={pageUrl} key="canonical-link" />
   ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage", 
    "@id": pageUrl,
    "url": pageUrl,
    "name": pageTitle, 
    "description": pageDescription, 

    ...(websiteSchema ? { "isPartOf": { "@id": websiteSchema["@id"] } } : {}),

     ...(industry.title ? {
       "about": {
         "@type": "Thing", 
         "name": industry.title
       }
     } : {}),

    ...(fullSocialImageUrl && industry.alt ? {
       "primaryImageOfPage": { 
          "@type": "ImageObject",
          "url": fullSocialImageUrl,
          "caption": industry.alt,
          
       }
    } : {}),

    ...(pageKeywords ? { "keywords": pageKeywords } : undefined),

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
       ...(organizationSchema ? [organizationSchema] : []), 
       ...(websiteSchema ? [websiteSchema] : []),      
       pageSchema,         
       ...(breadcrumbSchema ? [breadcrumbSchema] : []) 
   ].filter(Boolean); 

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
          
          return listItems.length > 0 ? React.createElement(item.tag, { key: index }, listItems) : null;

        case 'img':
          
          const width = item.width || 768; 
          const height = item.height || 432; 
          
          const imgAltText = typeof item.alt === 'string' && item.alt.trim() !== '' ? item.alt : (typeof item.content === 'string' && item.content.trim() !== '' ? item.content : `Industry Content Image ${index + 1}`);

          return item.src ? (
            
            <div className="industry-content-image-wrap" key={index}>
               <Image
                   src={item.src}
                   alt={imgAltText}
                   width={1000}
                  height={1000} 
                   quality={100}
                   priority={index < 2} 
               />
            </div>
          ) : null;
        case 'iframe':
           
          return item.src ? (
            <div className="video-embed-container" key={index} >
              <iframe
                src={item.src}
                title={`Embedded Content ${index + 1}`} 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : null;
        
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
        case 'div': 
          
           return (typeof item.content === 'string') ?
                   React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } }) :
                   null; 

        default:
           
          console.warn(`Unsupported tag in content renderer: ${item.tag}`);
          return (typeof item.content === 'string') ? <p key={`unsupported-${index}`} dangerouslySetInnerHTML={{ __html: item.content }} /> : null; 
      }
    }).filter(Boolean); 
  };

  return (
    <>
      {/* Head component for meta tags and schema */}
      <Head>
         {/* Render standard meta tags and canonical */}
         {headMetaTags}

        {/* Add the JSON-LD Schema script */}
         {finalSchema && finalSchema.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
                key="jsonld-schema" 
              />
         )}
      </Head>

       {breadcrumbItems && breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}

      {industry.fullImage && (
        <div className="industrie_detail_banner">
           <div className="detail_img_block">
              <Image
                  src={industry.fullImage}
                  alt={industry.alt || `Industry banner for ${industry.title}`} 
                  quality={100}
                  width={1000}
                  height={1000}
                  priority 
              />
           </div>
        </div>
      )}

      <div className="industries_detail_section" style={{ padding: '40px 0' }}> {/* Example padding */}
        <div className="container">
          {/* Main content container */}
          <div className="industrie_wrap_sec">
            {renderContent(industry.content)}
          </div>
        </div>
      </div>

    </>
  );
}