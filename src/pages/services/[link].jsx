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
import industriesDataFile from '../../files/industries.json';

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
  const industriesData = industriesDataFile;

  if (!service) {
    return { notFound: true };
  }

  return { props: { service, industriesData } };
}

const ServiceDetail = ({ service, industriesData }) => {
  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  const pageUrl = `${BASE_URL}${router.asPath}`;


   useEffect(() => {
       const pathSegments = router.pathname.split('/').filter(Boolean);
       const parentPath = '/' + pathSegments.slice(0, -1).join('/');
       const parentBreadcrumbs = breadcrumbData[parentPath];

       if (parentBreadcrumbs && Array.isArray(parentBreadcrumbs)) {
         const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
         const currentServiceItem = {
           label: service?.title || 'Service Details',
           name: service?.title || 'Service Details',
           href: router.asPath
         };
         itemsCopy.push(currentServiceItem);
         setBreadcrumbItems(itemsCopy);
       } else {
            const homeItem = { label: "Home", name: "Home", href: "/" };
            const serviceTypeItem = { label: service?.title || 'Service Details', name: service?.title || 'Service Details', href: router.asPath };
           setBreadcrumbItems([homeItem, serviceTypeItem]);
       }
   }, [router.pathname, router.asPath, service?.title]);


  const fullImageUrl = service?.image ?
    (service.image.startsWith('http') ? service.image : `${BASE_URL}${service.image}`)
    : `${BASE_URL}/images/social-share-og/Facebook.webp`;


  const customMeta = {
    title: service?.meta_title || `${service?.title || 'Service'} Details | Comsci`,
    description: service?.meta_description || service?.shortDescription || service?.title || 'Learn about Comsci digital services.',
    keywords: service?.chips?.map(chip => chip?.name).filter(Boolean) || [],

    og: {
       title: service?.meta_title || `${service?.title || 'Service'} | Comsci Service`,
       description: service?.meta_description || service?.shortDescription || service?.title || 'Comsci digital service.',
       url: pageUrl,
       type: 'article',
       image: fullImageUrl,
       imageAlt: service?.alt || `${service?.title || 'Service'} image`,
    },

    twitter: {
       card: 'summary_large_image',
       title: service?.meta_title || `${service?.title || 'Service'} | Comsci Service`,
       description: service?.meta_description || service?.shortDescription || service?.title || 'Comsci digital service details.',
       url: pageUrl,
       image: fullImageUrl,
       imageAlt: service?.alt || `${service?.title || 'Service'} image`,
    },

     robots: baseMetaData?.robots || 'index, follow',
     author: baseMetaData?.author || 'Comsci',
  };


    const headMetaTags = [
      customMeta.title && <title key="title">{customMeta.title}</title>,
      customMeta.description && <meta key="description" name="description" content={customMeta.description} />,

       ...(Array.isArray(customMeta.keywords) && customMeta.keywords.length > 0 ?
        [<meta key="keywords" name="keywords" content={customMeta.keywords.join(', ')} />]
        : []),

      customMeta.robots && <meta key="robots" name="robots" content={customMeta.robots} />,
      customMeta.author && <meta key="author" name="author" content={customMeta.author} />,

      pageUrl && <link rel="canonical" href={pageUrl} key="canonical-link" />,

       ...(customMeta.og ? [
         customMeta.og.title && <meta key="og:title" property="og:title" content={customMeta.og.title} />,
         customMeta.og.description && <meta key="og:description" property="og:description" content={customMeta.og.description} />,
         customMeta.og.type && <meta key="og:type" property="og:type" content={customMeta.og.type} />,
         customMeta.og.url && <meta key="og:url" property="og:url" content={customMeta.og.url} />,
         customMeta.og.image && <meta key="og:image" property="og:image" content={customMeta.og.image} />,
         customMeta.og.imageAlt && <meta key="og:image:alt" property="og:image:alt" content={customMeta.og.imageAlt} />,
       ] : []),

       ...(customMeta.twitter ? [
         customMeta.twitter.card && <meta key="twitter:card" name="twitter:card" content={customMeta.twitter.card} />,
         customMeta.twitter.title && <meta key="twitter:title" name="twitter:title" content={customMeta.twitter.title} />,
         customMeta.twitter.description && <meta key="twitter:description" name="twitter:description" content={customMeta.twitter.description} />,
         customMeta.twitter.url && <meta key="twitter:url" name="twitter:url" content={customMeta.twitter.url} />,
         customMeta.twitter.image && <meta key="twitter:image" name="twitter:image" content={customMeta.twitter.image} />,
         customMeta.twitter.imageAlt && <meta key="twitter:image:alt" name="twitter:image:alt" content={customMeta.twitter.imageAlt} />,
       ] : []),
    ].filter(Boolean);


   const pageSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": pageUrl,
      "url": pageUrl,
      "name": service?.title || 'Service',
      "description": service?.meta_description || service?.shortDescription || 'Comsci digital service details.',
      ...(websiteSchema ? { "isPartOf": { "@id": websiteSchema["@id"] } } : {}),
       ...(organizationSchema ? { "provider": { "@id": organizationSchema["@id"] } } : {}),

       "image": fullImageUrl,

       "serviceType": service?.title || 'Digital Service',

       "keywords": service?.chips?.map(chip => chip?.name).filter(Boolean).join(', ') || undefined,

       "mainEntityOfPage": {
         "@type": "WebPage",
         "@id": pageUrl
       }
    };


  let breadcrumbSchema = null;
  if (breadcrumbItems && Array.isArray(breadcrumbItems) && breadcrumbItems.length > 0) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => {
           const itemUrl = item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`;
           return {
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name || item.label || service?.title || 'Service',
              "item": itemUrl
          };
       })
    };
  }

  const finalSchema = [
     organizationSchema,
     websiteSchema,
     pageSchema,
     ...(breadcrumbSchema ? [breadcrumbSchema] : [])
  ].filter(Boolean);


   const renderContent = (content) => {
       if (!Array.isArray(content)) return null;

       return content.map((item, index) => {
          if (!item || typeof item.tag !== 'string' || item.tag.trim() === '') return null;
          const Tag = item.tag.toLowerCase();

          switch(Tag) {
              case 'ul':
              case 'ol':
                   if (!Array.isArray(item.content)) return null;
                   const listItems = item.content.map((listItem, listIndex) => {
                       if (!listItem || typeof listItem.content !== 'string') return null;
                       return <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>;
                   }).filter(Boolean);
                   return listItems.length > 0 ? React.createElement(Tag, { key: index }, listItems) : null;

              case 'img':
                  const width = item.width || 1000;
                  const height = item.height || 600;
                  const altText = typeof item.content === 'string' ? item.content : `${service?.title || 'Service'} content image ${index + 1}`;
                  const imgSrc = item.image;

                  if (!imgSrc) return null;

                  return (
                       <div className="image-container" key={index} style={{ margin: '20px 0', maxWidth: '100%', width: '100%', overflow: 'hidden'}}>
                            <Image
                                src={imgSrc}
                                alt={altText}
                                quality={90}
                                width={width}
                                height={height}
                                layout="responsive"
                                objectFit="contain"
                                sizes="(max-width: 768px) 100vw, 800px"
                             />
                       </div>
                   );

               case 'iframe':
                   return item.src ? (
                       <div className="video-embed" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '20px auto' }}>
                           <iframe loading="lazy" src={item.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`Embedded Content ${index + 1}`}></iframe>
                       </div>
                    ) : null;

                case 'a':
                     if (typeof item.content === 'string' && typeof item.href === 'string') {
                          return <a key={index} href={item.href} target={item.target || "_blank"} rel={item.rel || "noopener noreferrer"}>{item.content}</a>;
                     }
                     return null;


               default:
                    return (typeof item.content === 'string') ?
                           React.createElement(Tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } })
                           : null;
           }
        }).filter(Boolean);
      };


   if (!service) {
     return <p>Loading service details or Service not found...</p>;
   }

  return (
    <>
      <Head>
         {headMetaTags}

        {finalSchema && finalSchema.length > 0 && (
             <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
               key="jsonld-schema-service"
             />
        )}
      </Head>

      {breadcrumbItems && breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}


        <div className="main-service-content-container">
          <InnerBanner banner={service}/>

          <div className="process">
            <div className="container">
              <div className="process_section">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="caption_box">
                      {(service.subtitle || service.title) && <h1 className="service_detail_title">{service.subtitle || service.title}</h1>}
                      {renderContent(service.content)}
                    </div>
                  </div>
                  <div className="col-lg-3 offset-lg-1">
                    <div className="box_wrap">
                      <span>Expertise Areas</span>
                       {Array.isArray(service.chips) && service.chips.length > 0 && (
                           <ul>
                               {service.chips.map((chip, index) => (
                                   chip?.name && typeof chip.name === 'string' ? <li key={index}>{chip.name}</li> : null
                               )).filter(Boolean)}
                           </ul>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {service.strategy && Array.isArray(service.strategy.strategySteps) && service.strategy.strategySteps.length > 0 && (
              <ServiceProcess
                  strategyTitle={service.strategy.strategyTitle}
                  strategyDescription={service.strategy.strategyDescription}
                  steps={service.strategy.strategySteps}
              />
           )}

          <ProjectSection />

           {service.faqs && Array.isArray(service.faqs) && service.faqs.length > 0 && (
              <Faqsection
                 faqs={service.faqs}
                 title={`Frequently Asked Questions about ${service.title || 'This Service'}`}
              />
           )}

           {industriesData && Array.isArray(industriesData?.industries) && industriesData.industries.length > 0 && (
               <IndustriesPage industries={industriesData.industries} />
           )}

        </div>

    </>
  );
};

export default ServiceDetail;