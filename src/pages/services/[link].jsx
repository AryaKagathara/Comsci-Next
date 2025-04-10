
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from 'react'; 
import InnerBanner from "@/components/layout/InnerBanner";
import ServiceProcess from "@/components/layout/ServiceProcess";
import ProjectSection from "@/components/ProjectSection";
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';

import baseMetaData from '../../files/meta.json'; 

import breadcrumbData from '../../files/breadcrumbs.json'; 

import { organizationSchema, websiteSchema, BASE_URL } from '../../lib/commonSchema'; 

export async function getStaticPaths() {
  const servicesData = require('../../files/services.json');
  const services = servicesData.services;
  const paths = services.map(service => ({
    params: { link: service.link }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const servicesData = require('../../files/services.json');
  const services = servicesData.services;
  const service = services.find(s => s.link === params.link); 
  if (!service) {
    return { notFound: true };
  }
  
  return { props: { service } };
}

const ServiceDetail = ({ service }) => {
  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]); 

  useEffect(() => {
    
    const pathSegments = router.pathname.split('/').filter(Boolean);
    let parentPath = '/';
    if (pathSegments.length > 1) {
      parentPath = '/' + pathSegments.slice(0, -1).join('/');
    }

    const parentBreadcrumbs = breadcrumbData[parentPath];

    if (parentBreadcrumbs && service?.title && router.asPath) {
      const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
      const currentServiceItem = {
        label: service.title, 
        name: service.title, 
        href: router.asPath
      };
      itemsCopy.push(currentServiceItem);
      setBreadcrumbItems(itemsCopy);
    } else {
      setBreadcrumbItems(breadcrumbData['/'] || []);
    }
  }, [router.pathname, router.asPath, service?.title]); 

  const fullImageUrl = service.image ? (service.image.startsWith('http') ? service.image : `${BASE_URL}${service.image}`) : `${BASE_URL}/images/social-share-og/Facebook.webp`; 
  const customMeta = {
    title: `${service.title} | Comsci Services`,
    description: service.shortDescription,
    keywords: service.chips?.map(chip => chip.name) || [], 
    og: {
      title: `${service.title} | Comsci Services`,
      description: service.shortDescription,
      image: fullImageUrl,
      imageAlt: `Comsci's ${service.title} Service`,
    },
    twitter: {
      
      title: `${service.title} | Comsci Services`,
      description: service.shortDescription,
      image: fullImageUrl, 
      imageAlt: `Comsci's ${service.title} Service`,
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
    "@type": "Service", 
    "@id": pageUrl, 
    "url": pageUrl,
    "name": service.title,
    "description": service.shortDescription, 
    "isPartOf": {
      "@id": websiteSchema["@id"] 
    },
    "provider": {
      "@id": organizationSchema["@id"] 
    },
    
    "image": fullImageUrl,
    "serviceType": service.title, 
    
    "areaServed": organizationSchema.areaServed,
    
     "keywords": service.chips?.map(chip => chip.name).join(', '),
    
  };

  let breadcrumbSchema = null;
  if (breadcrumbItems && breadcrumbItems.length > 0) {
      breadcrumbSchema = {
		"@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
             
             "name": item.name || item.label || service.title,
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
    if (!Array.isArray(content)) return null; 

    return content.map((item, index) => {
        if (!item || !item.tag) return null; 

        switch (item.tag) {
            case 'ul':
            case 'ol':
                 if (!Array.isArray(item.content)) return null;
                 const listItems = item.content.map((listItem, listIndex) => {
                    if (!listItem || typeof listItem.content !== 'string') return null;
                    return <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>
                 }).filter(Boolean); 
                 return React.createElement(item.tag, { key: index }, listItems);
            case 'img':
                 
                 const width = item.width || 768; 
                 const height = item.height || 432; 
                 const altText = typeof item.content === 'string' ? item.content : `Service Image ${index + 1}`;
                 return item.image ? (
                    <div className="image" key={index} style={{ position: 'relative', width: '100%', maxWidth: `${width}px`, height: 'auto', margin: '20px 0' }}>
                      <Image src={item.image} alt={altText} width={width} height={height} style={{ width: '100%', height: 'auto' }} quality={90} priority={index < 2} /> {/* Set priority for early images */}
                    </div>
                  ) : null;
             case 'iframe': 
                 return item.src ? (
                     <div className="video-embed" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000', margin: '20px 0' }}>
                        <iframe
                           src={item.src}
                           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                           frameBorder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           title={`Embedded Content ${index + 1}`}>
                        </iframe>
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
      {/* Use state variable for breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Ensure service object exists before accessing properties */}
      {service && (
        <>
          <InnerBanner banner={service}/>
          <div className="process">
            <div className="container">
              <div className="process_section">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="caption_box">
                      <h1>{service.title}</h1> {/* Use h1 for the main title */}
                      {renderContent(service.content)}
                    </div>
                  </div>
                  <div className="col-lg-3 offset-lg-1">
                    <div className="box_wrap">
                      <span>Process</span>
                       {/* Check if chips exist and is array */}
                       {Array.isArray(service.chips) && service.chips.length > 0 && (
                           <ul>
                               {service.chips.map((chip, index) => (
                                   chip?.name && <li key={index}>{chip.name}</li> 
                               ))}
                           </ul>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pass strategy data only if it exists */}
          {service.strategy && (
              <ServiceProcess
                  strategyTitle={service.strategy.strategyTitle}
                  strategyDescription={service.strategy.strategyDescription}
                  steps={service.strategy.strategySteps || []}
              />
           )}
          <ProjectSection />
        </>
      )}
      {/* Add a loading state or fallback if service data isn't ready, though getStaticProps handles this mostly */}
      {!service && <p>Loading service details...</p>}
    </>
  );
};

export default ServiceDetail;