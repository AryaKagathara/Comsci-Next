import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../../files/meta.json'; 

import breadcrumbData from '../../files/breadcrumbs.json'; 

import { organizationSchema, websiteSchema, BASE_URL } from '../../lib/commonSchema'; 

export async function getStaticPaths() {
    const blogs = require('../../files/blogs.json');
    const paths = blogs.map(blog => ({
        params: { link: blog.link }, 
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const blogs = require('../../files/blogs.json');
    const blog = blogs.find(b => b.link === params.link); 

    if (!blog) {
        return { notFound: true };
    }
    
    return { props: { blog } };
}

export default function BlogDetail({ blog }) {
    const router = useRouter();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]); 

    useEffect(() => {
        const pathSegments = router.pathname.split('/').filter(Boolean);
        let parentPath = '/';
        if (pathSegments.length > 1) {
          parentPath = '/' + pathSegments.slice(0, -1).join('/'); 
        }
        const parentBreadcrumbs = breadcrumbData[parentPath];

        if (parentBreadcrumbs && blog?.subtitle && router.asPath) { 
          const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
          const currentBlogItem = {
            label: blog.subtitle, 
            name: blog.subtitle, 
            href: router.asPath
          };
          itemsCopy.push(currentBlogItem);
          setBreadcrumbItems(itemsCopy);
        } else if (parentBreadcrumbs && blog?.title && router.asPath) { 
          const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
          const currentBlogItem = {
            label: blog.title,
            name: blog.title,
            href: router.asPath
          };
          itemsCopy.push(currentBlogItem);
           setBreadcrumbItems(itemsCopy);
        }
         else {
          setBreadcrumbItems(breadcrumbData['/'] || []);
        }
    }, [router.pathname, router.asPath, blog?.title, blog?.subtitle]); 

     if (!blog) {
        return <div>Blog post not found.</div>;
     }

    const fullImageUrl = blog.image ? (blog.image.startsWith('http') ? blog.image : `${BASE_URL}${blog.image}`) : `${BASE_URL}/images/social-share-og/Facebook.webp`;
    const metaDescription = blog.subtitle || blog.title; 

    const customMeta = {
        title: `${blog.title} | Comsci Blog`,
        description: metaDescription,
        keywords: blog.keywords || [blog.category].filter(Boolean), 
        og: {
            type: 'article', 
            title: `${blog.title} | Comsci Blog`,
            description: metaDescription,
            image: fullImageUrl,
            imageAlt: `Featured image for ${blog.title}`, 
            url: `${BASE_URL}${router.asPath}` 
        },
        twitter: {
            
            title: `${blog.title} | Comsci Blog`,
            description: metaDescription,
            image: fullImageUrl,
            imageAlt: `Featured image for ${blog.title}`,
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

    let datePublishedISO = null;
    try {
        const dateParts = blog.date.split('-');
        if (dateParts.length === 3) {
             
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            datePublishedISO = new Date(formattedDate).toISOString();
        }
    } catch (e) {
        console.error("Error parsing blog date:", blog.date, e);
    }

    const pageSchema = {
        "@type": "BlogPosting", 
        "@id": pageUrl, 
        "mainEntityOfPage": { 
            "@type": "WebPage",
            "@id": pageUrl
        },
        "url": pageUrl,
        "headline": blog.title,
        "name": blog.title, 
        "description": blog.subtitle || blog.title, 
        "keywords": blog.keywords ? blog.keywords.join(', ') : (blog.category || undefined), 
        "image": { 
            "@type": "ImageObject",
            "url": fullImageUrl, 
            "caption": `Featured image for ${blog.title}`
            
        },
        
        "author": {
            "@type": "Person", 
            "name": blog.author
        },
        "publisher": {
            "@id": organizationSchema["@id"] 
        },
         
        ...(datePublishedISO && { "datePublished": datePublishedISO }),
        ...(datePublishedISO && { "dateModified": datePublishedISO }), 
        "isPartOf": { 
          "@id": websiteSchema["@id"]
        },
         "articleSection": blog.category 
         
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
            <Breadcrumb items={breadcrumbItems} />

            {/* Blog Detail Content */}
            <div className="blogdetail" style={{ padding: '40px 0' }}> {/* Added example padding */}
                <div className="container">
                    <div className="blogdetail_section">
                        {/* Use H1 for the main blog post title */}
                        <h1>{blog.title}</h1>
                        {/* Meta information */}
                        <div className="caption" style={{ color: '#666', marginBottom: '20px' }}> {/* Example styling */}
                            <i>{blog.category}</i>
                            <div className="dot" style={{ display: 'inline-block', margin: '0 10px', width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }}></div> {/* Example dot styling */}
                            <i><time dateTime={datePublishedISO || ''}>{blog.date}</time></i> {/* Wrap date in time tag */}
                            <div className="dot" style={{ display: 'inline-block', margin: '0 10px', width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>
                            <i>{blog.author}</i>
                        </div>
                        {/* Main Blog Image */}
                        {blog.image && (
                            <div className="image" style={{ marginBottom: '30px', maxWidth: '1000px' }}> {/* Example styling */}
                                {/* Make main image priority */}
                                <Image src={blog.image} alt={blog.title} quality={95} width={1000} height={600} style={{ width: '100%', height: 'auto'}} priority />
                            </div>
                        )}
                        {/* Render the main content blocks */}
                        {renderContent(blog.content)}
                    </div>
                </div>
            </div>
        </>
    );
}