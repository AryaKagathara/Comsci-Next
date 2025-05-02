
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from 'react'; 
import InnerBanner from "@/components/layout/InnerBanner";
import ServiceProcess from "@/components/layout/ServiceProcess";
import ProjectSection from "@/components/ProjectSection";
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import IndustriesPage from "@/components/IndustriesPage";
import Faqsection from "@/components/layout/Faqsection";

import baseMetaData from '../../files/meta.json'; 

import breadcrumbData from '../../files/breadcrumbs.json';

import industriesData from '../../files/industries.json';

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
  
  return { props: { service, industriesData } };
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

    if (parentBreadcrumbs && service?.metatitle && router.asPath) {
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
  }, [router.pathname, router.asPath, service?.metatitle]); 

  const fullImageUrl = service.image ? (service.image.startsWith('http') ? service.image : `${BASE_URL}${service.image}`) : `${BASE_URL}/images/social-share-og/Facebook.webp`; 
  const customMeta = {
    title: `${service.metatitle}`,
    description: service.shortDescription,
    keywords: service.chips?.map(chip => chip.name) || [], 
    og: {
      title: `${service.title}`,
      description: service.metatitle,
      image: fullImageUrl,
      imageAlt: `${service.metatitle}`,
    },
    twitter: {
      
      title: `${service.title}`,
      description: service.metatitle,
      image: fullImageUrl, 
      imageAlt: `${service.metatitle}`,
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
             
             "name": item.name || item.label || service.subtitle,
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

         switch(item.tag) {
             case 'ul':
             case 'ol':
                  if (!Array.isArray(item.content)) return null;
                  const listItems = item.content.map((listItem, listIndex) => {
                      if (!listItem || typeof listItem.content !== 'string') return null;
                      return <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>;
                  }).filter(Boolean);
                  return React.createElement(item.tag, { key: index }, listItems);
             case 'img':
                  const width = item.width || 1000; 
                  const height = item.height || 600; 
                  const altText = typeof item.content === 'string' ? item.content : `Blog content image ${index + 1}`;
                  return item.image ? ( 
                     <div className="image" key={index} style={{ margin: '20px 0', maxWidth: `${width}px`}}>
                        <Image src={item.image} alt={altText} quality={90} width={width} height={height} style={{ width: '100%', height: 'auto'}} />
                     </div>
                  ) : null;
              case 'iframe':
                  return item.src ? (
                      <div className="video-embed" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '20px auto' }}>
                           <iframe loading="lazy" src={item.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Embedded Content ${index + 1}`}></iframe>
                      </div>
                   ) : null;
               case 'a': 
                    if (item.src && item.src.includes('youtube.com/embed')) {
                        
                         return (
                           <div className="video-embed" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '20px auto' }}>
                              <iframe loading="lazy" src={item.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Embedded Video ${index + 1}`}></iframe>
                           </div>
                        );
                    }
                    
                    return (item.content && item.href) ? <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">{item.content}</a> : null;

              default: 
                   return (typeof item.content === 'string') ? React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } }) : null;
          }
       }).filter(Boolean);
     };

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
                      <h1 className=".service_title">{service.subtitle}</h1>
                      {renderContent(service.content)}
                    </div>
                  </div>
                  <div className="col-lg-3 offset-lg-1">
                    <div className="box_wrap">
                      <span>Work</span>
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
          {service.strategy && (
              <ServiceProcess
                  strategyTitle={service.strategy.strategyTitle}
                  strategyDescription={service.strategy.strategyDescription}
                  steps={service.strategy.strategySteps || []}
              />
           )}
          <ProjectSection />
           {service.faqs && service.faqs.length > 0 && (
              <Faqsection
                 faqs={service.faqs} 
                 title={`${service.title} FAQs`} 
              />
           )}
          <IndustriesPage industries={industriesData} />

        </>
      )}
      {!service && <p>Loading service details...</p>}
    </>
  );
};

export default ServiceDetail;