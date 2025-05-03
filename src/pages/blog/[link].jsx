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

const parseDateToISO = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('-');
    if (parts.length === 3) {

        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        try {

            const date = new Date(formattedDate);
            if (!isNaN(date)) {
                return date.toISOString();
            }
        } catch (e) {
            console.error(`Error parsing date string ${dateString}:`, e);
            return null;
        }
    }
    console.warn(`Date string format not expected: ${dateString}`);
    return null;
};

export default function BlogDetail({ blog }) {
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

        const parentBreadcrumbs = breadcrumbData[parentPath] || breadcrumbData['/blogs'] || breadcrumbData['/'] || [];

        let itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));

        if (blog?.title && router.asPath) {
            const currentBlogItem = {
                label: blog.subtitle || blog.title,
                name: blog.subtitle || blog.title,
                href: router.asPath
            };

            if (!itemsCopy.find(item => item.href === router.asPath)) {
                itemsCopy.push(currentBlogItem);
            }
        } else if (itemsCopy.length === 0 && blog?.title && router.asPath) {

            itemsCopy = [{ label: blog.title, name: blog.title, href: router.asPath }];
        }

        setBreadcrumbItems(itemsCopy);

    }, [router.pathname, router.asPath, blog?.title, blog?.subtitle, breadcrumbData]);

    if (!blog) {

        return <div>Blog post not found.</div>;
    }

    const fullImageUrl = blog.image ?
        (blog.image.startsWith('http') ? blog.image : `${BASE_URL}${blog.image}`)
        : `${BASE_URL}/images/social-share-og/Facebook.webp`;

    const pageTitle = blog.meta_title || `${blog.title} | Comsci Blog`;
    const pageDescription = blog.meta_description || blog.subtitle || blog.title;

    const pageKeywords = Array.isArray(blog.keywords) && blog.keywords.length > 0 ?
        blog.keywords.join(', ') :
        (typeof blog.keywords === 'string' && blog.keywords.length > 0 ? blog.keywords : '');
    const pageRobots = baseMetaData.robots || 'index, follow';
    const pageAuthorName = blog.author || baseMetaData.author || 'Comsci';
    const pageUrl = `${BASE_URL}${router.asPath}`;

    const headMetaTags = [
        <title key="title">{pageTitle}</title>,
        <meta key="description" name="description" content={pageDescription} />,
        ...(pageKeywords ? [<meta key="keywords" name="keywords" content={pageKeywords} />] : []),
        <meta key="robots" name="robots" content={pageRobots} />,
        <meta key="author" name="author" content={pageAuthorName} />,

        <meta key="og:title" property="og:title" content={pageTitle} />,
        <meta key="og:description" property="og:description" content={pageDescription} />,
        <meta key="og:type" property="og:type" content="article" />,
        <meta key="og:url" property="og:url" content={pageUrl} />,
        ...(fullImageUrl ? [<meta key="og:image" property="og:image" content={fullImageUrl} />] : []),
        ...(blog.alt ? [<meta key="og:image:alt" property="og:image:alt" content={blog.alt} />] : []),

        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
        <meta key="twitter:title" name="twitter:title" content={pageTitle} />,
        <meta key="twitter:description" name="twitter:description" content={pageDescription} />,
        ...(fullImageUrl ? [<meta key="twitter:image" name="twitter:image" content={fullImageUrl} />] : []),
        ...(blog.alt ? [<meta key="twitter:image:alt" name="twitter:image:alt" content={blog.alt} />] : []),

        <link rel="canonical" href={pageUrl} key="canonical-link" />
    ];

    const datePublishedISO = parseDateToISO(blog.date);
    const dateModifiedISO = blog.dateModified ? parseDateToISO(blog.dateModified) : datePublishedISO;

    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": pageUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        },
        "url": pageUrl,
        "headline": blog.title,
        "name": pageTitle,
        "description": pageDescription,

        ...(pageKeywords ? { "keywords": pageKeywords } : undefined),

        ...(fullImageUrl && blog.alt ? {
            "image": {
                "@type": "ImageObject",
                "url": fullImageUrl,
                "caption": blog.alt

            }
        } : {}),

        ...(pageAuthorName ? {
            "author": {
                "@type": "Person",
                "name": pageAuthorName
            }
        } : {}),

        ...(organizationSchema ? {
            "publisher": {
                "@id": organizationSchema["@id"]
            }
        } : {}),

        ...(datePublishedISO && { "datePublished": datePublishedISO }),

        ...(dateModifiedISO && { "dateModified": dateModifiedISO }),

        ...(websiteSchema ? {
            "isPartOf": {
                "@id": websiteSchema["@id"]
            }
        } : {}),

        ...(blog.category ? { "articleSection": blog.category } : undefined),

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
        if (!Array.isArray(content)) return null;

        return content.map((item, index) => {
            if (!item || !item.tag) return null;

            switch (item.tag) {
                case 'ul':
                case 'ol':
                    if (!Array.isArray(item.content)) return null;
                    const listItems = item.content.map((listItem, listIndex) => {

                        if (!listItem || typeof listItem.content !== 'string' || listItem.content.trim() === '') return null;
                        return <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>;
                    }).filter(Boolean);

                    return listItems.length > 0 ? React.createElement(item.tag, { key: index }, listItems) : null;

                case 'img':
                    const width = item.width || 800;
                    const height = item.height || 500;
                    const imgAltText = typeof item.content === 'string' && item.content.trim() !== '' ? item.content : `Blog content image ${index + 1}`;

                    return item.image ? (

                        <div className="blog-content-image-wrap" key={index} style={{ margin: '20px auto', maxWidth: `${width}px`, display: 'block', height: 'auto' }}>
                            <Image
                                src={item.image}
                                alt={imgAltText}
                                quality={90}
                                width={width}
                                height={height}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                priority={index < 2}
                            />
                        </div>
                    ) : null;
                case 'iframe':

                    return item.src ? (
                        <div className="video-embed-container" key={index} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '20px auto', background: '#000' }}>
                            <iframe
                                loading="lazy"
                                src={item.src}
                                title={`Embedded Content ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            ></iframe>
                        </div>
                    ) : null;
                case 'a':

                    return (item.content && typeof item.content === 'string' && item.href && typeof item.href === 'string') ?
                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: item.content }}></a>
                        : null;

                default:

                    return (typeof item.content === 'string') ?
                        React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } }) :
                        null;
            }
        }).filter(Boolean);
    };

    return (
        <>
            <Head>
                {/* Render standard meta tags and canonical from the headMetaTags array */}
                {headMetaTags}

                {/* Add the JSON-LD Schema script */}
                {/* Only render the script tag if there is schema data */}
                {finalSchema && finalSchema.length > 0 && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
                        key="jsonld-schema"
                    />
                )}
            </Head>

            {/* Render Breadcrumb only if items exist */}
            {breadcrumbItems && breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}

            {/* Blog Detail Content */}
            <div className="blogdetail" style={{ padding: '40px 0' }}> {/* Added example padding */}
                <div className="container">
                    <div className="blogdetail_section">
                        {/* Use H1 for the main blog post title - Crucial for on-page SEO */}
                        <h1>{blog.title}</h1>
                        {/* Meta information */}
                        {/* Main Blog Image */}
                        {/* Use item.image for source here */}
                        {blog.image && (
                            <div className="image" style={{ marginBottom: '30px', maxWidth: '1000px' }}> {/* Example styling */}
                                {/* Make main image priority, use blog.alt */}
                                <Image src={blog.image} alt={blog.alt || `Featured image for ${blog.title}`} quality={95} width={1000} height={600} style={{ width: '100%', height: 'auto' }} priority />
                            </div>
                        )}
                        {/* Render the main content blocks */}
                        {renderContent(blog.content)}
                        <div className="caption" style={{ color: '#666', marginBottom: '20px' }}> {/* Example styling */}
                            {blog.category && <i>{blog.category}</i>} {/* Conditionally render category */}
                            {blog.category && (blog.date || blog.author) && <div className="dot" style={{ display: 'inline-block', margin: '0 10px', width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>} {/* Example dot styling */}

                            {blog.date && <i><time dateTime={datePublishedISO || ''}>{blog.date}</time></i>} {/* Wrap date in time tag for semantic meaning */}
                            {blog.date && blog.author && <div className="dot" style={{ display: 'inline-block', margin: '0 10px', width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>} {/* Example dot styling */}

                            {blog.author && <i>{blog.author}</i>} {/* Conditionally render author */}
                            {blog.readingTime && blog.author && <div className="dot" style={{ display: 'inline-block', margin: '0 10px', width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>} {/* Example dot styling */}
                            {blog.readingTime && <i>{blog.readingTime} Reading</i>} {/* Add reading time */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}