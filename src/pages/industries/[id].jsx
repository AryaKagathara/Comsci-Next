import Head from "next/head";
import Image from "next/image";
import React from 'react';
import metaData from '../../files/meta.json'; // Import your default meta data
import breadcrumbData from '../../files/breadcrumbs.json'; // Import breadcrumb data
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getStaticPaths() {
    const industries = require('../../files/industries.json');
    const paths = industries.map(industry => ({
        params: { id: industry.link },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const industries = require('../../files/industries.json');
    const industry = industries.find(industry => industry.link === params.id);

    if (!industry) {
        return { notFound: true };
    }
    return { props: { industry } };
}


export default function IndustryDetail({ industry }) {

    const router = useRouter();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]); // State for breadcrumbs

    useEffect(() => {
        // --- Logic to derive parent path ---
        const pathSegments = router.pathname.split('/').filter(Boolean); // e.g., ['industries', '[id]']
        let parentPath = '/'; // Default to root
        if (pathSegments.length > 1) {
          parentPath = '/' + pathSegments.slice(0, -1).join('/'); // e.g., "/industries"
        }
        // --- End Parent Path Logic ---

        // Look up the parent's breadcrumbs in the JSON
        const parentBreadcrumbs = breadcrumbData[parentPath];

        // Check if parent items found & current industry data exists
        if (parentBreadcrumbs && industry?.title && router.asPath) {
          // Create a deep copy of parent items
          const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));

          // Create the item for the current industry page
          const currentIndustryItem = {
            name: industry.title, // Use the actual industry title
            href: router.asPath   // Use the actual URL
          };

          // Append the current industry item
          itemsCopy.push(currentIndustryItem);
          setBreadcrumbItems(itemsCopy); // Update state

        } else {
          // Fallback to Home if parent not in JSON or data missing
          setBreadcrumbItems(breadcrumbData['/'] || []);
        }
    }, [router.pathname, router.asPath, industry?.title]); // Dependencies

    const customMeta = {
        title: `${industry.title} Industry | Comsci`,
        description: industry.description,
        keywords: industry.keywords || [], // Use keywords from industry data if available
        og: {
            title: `${industry.title} Industry Solutions | Comsci`,
            description: industry.description,            
            image: industry.fullImage, // Assuming fullImage is the best for social sharing
            imageAlt: `Comsci's expertise in ${industry.title} Industry`,
         },
        twitter: {
           title: `${industry.title} Industry Solutions | Comsci`,
            description: industry.description,           
            image: industry.fullImage,
            imageAlt: `Comsci's expertise in ${industry.title} Industry`,
        },    
    };

     const getMetaTags = (metaData, customMeta = {}) => {
        const mergedMeta = { ...metaData, ...customMeta };

        //handle nested og and twitter objects to override and merge correctly
        mergedMeta.og = { ...metaData?.og, ...customMeta?.og }
        mergedMeta.twitter = { ...metaData?.twitter, ...customMeta?.twitter }
    
    
        return Object.entries(mergedMeta).map(([key, value]) => {
          if (key === "title") {
            return <title key={key}>{value}</title>;
          }
          if (typeof value === 'string') {
            return <meta key={key} name={key} content={value} />;
          }
          if (typeof value === 'object'){
            return Object.entries(value).map(([property, content]) => (
              <meta key={`${key}:${property}`} property={`${key}:${property}`} content={content} />
              ))
          }
          return null
        }).filter(Boolean);
      };

    const renderContent = (content) => {
        if (Array.isArray(content)) {
          return content.map((item, index) => {
          if (item.tag === 'ul') {
                  let list = item.content.map((listItem, index) => <li key={index} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>)
                  return <ul key={index}>{list}</ul>;
          } else if(item.tag === 'img') {
               return <Image key={index} src={item.src} alt={item.alt} width={item.width || 500} height={item.height || 350} />
          } else if (item.content) {
                  return React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } });
              }
                return null;
            });
        } else {
            return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
        }
    };

    return (
        <>
            <Head>
                {getMetaTags(metaData, customMeta)}
            </Head>
            <Breadcrumb items={breadcrumbItems} />
            {industry.fullImage && (
                <div className="industrie_detail_banner">
                    <div className="detail_img_block">
                      <Image src={industry.fullImage} alt={industry.title} quality={100} width={1000} height={1000} />                        
                    </div>
                </div>
            )}

            <div className="industries_detail_section">
                <div className="container">
                    <div className="industrie_wrap_sec">
                        {renderContent(industry.content)}
                    </div>
                </div>
            </div>
        </>
    );
}