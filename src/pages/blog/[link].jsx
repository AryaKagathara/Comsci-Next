import Head from "next/head";
import Image from "next/image";
import React from 'react';
import metaData from '../../files/meta.json';
import breadcrumbData from '../../files/breadcrumbs.json'; // Import breadcrumb data
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getStaticPaths() {
    const blogs = require('../../files/blogs.json');
    const paths = blogs.map(blog => ({
        params: { link: blog.link },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const blogs = require('../../files/blogs.json');
    const blog = blogs.find(blog => blog.link === params.link);

    if (!blog) {
        return { notFound: true }
    }
    return { props: { blog } };
}

export default function BlogDetail({ blog }) {

    const router = useRouter();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]); // State for breadcrumbs

    useEffect(() => {
        // --- Logic to derive parent path ---
        // router.pathname for /blogs/[link] should be "/blogs/[link]"
        const pathSegments = router.pathname.split('/').filter(Boolean); // e.g., ['blogs', '[link]']
        let parentPath = '/'; // Default to root
        if (pathSegments.length > 1) {
          parentPath = '/' + pathSegments.slice(0, -1).join('/'); // e.g., "/blogs"
        }
        // --- End Parent Path Logic ---

        // Look up the parent's breadcrumbs in the JSON
        const parentBreadcrumbs = breadcrumbData[parentPath];

        // Check if parent items found & current blog data exists
        if (parentBreadcrumbs && blog?.title && router.asPath) {
          // Create a deep copy of parent items
          const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));

          // Create the item for the current blog page
          const currentBlogItem = {
            name: blog.title,    // Use the actual blog title
            href: router.asPath  // Use the actual URL
          };

          // Append the current blog item
          itemsCopy.push(currentBlogItem);
          setBreadcrumbItems(itemsCopy); // Update state

        } else {
          // Fallback to Home if parent not in JSON or data missing
          setBreadcrumbItems(breadcrumbData['/'] || []);
        }
    }, [router.pathname, router.asPath, blog?.title]);

    const customMeta = {
        title: `${blog.title} | Comsci Blog`,
        description: blog.title, // You might want to use a short description or excerpt here if available
        keywords: blog.keywords || [],  // Add keywords to your blog data if you have them
        og: {
            title: `${blog.title} | Comsci Blog`,
            description: blog.title,
            image: blog.image,  // Assuming 'image' is the main image for the blog post
            imageAlt: `Blog Post Image for ${blog.title}`,
        },
        twitter: {
            title: `${blog.title} | Comsci Blog`,
            description: blog.title,
            image: blog.image,
            imageAlt: `Blog Post Image for ${blog.title}`,
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
            if (typeof value === 'object') {
                return Object.entries(value).map(([property, content]) => (
                    <meta key={`${key}:${property}`} property={`${key}:${property}`} content={content} />
                ))
            }
            return null;
        }).filter(Boolean);
    };

    const renderContent = (content) => {
        return content.map((item, index) => {
                if (item.tag === 'ul' || item.tag === 'ol') {
                        const listItems = item.content.map((listItem, listIndex) => (
                                <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }} />
                        ));
                        return React.createElement(item.tag, { key: index }, listItems);
                } else if (item.tag === 'img') {
                    return <div className="image" key={index}><Image src={item.image} alt={item.content} quality={100} width={1000} height={600} /></div>;
                } else if (item.tag === 'iframe' && item.src) {
                    return <iframe key={index} src={item.src} title="Embedded Content" allowFullScreen />;
                } else if (item.content) {
                    return React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } });
                }
                return null;
        });
    };


    return (
        <>
            <Head>
                {getMetaTags(metaData, customMeta)}
            </Head>
            <Breadcrumb items={breadcrumbItems} />
            <div className="blogdetail">
                <div className="container">
                    <div className="blogdetail_section">
                        <span>{blog.title}</span>
                        <div className="caption">
                            <i>{blog.category}</i>
                            <div className="dot"></div>
                            <i>{blog.date}</i>
                            <div className="dot"></div>
                            <i>{blog.author}</i>
                        </div>
                        {/* Conditionally render the main blog image if it exists */}
                        {blog.image && (
                            <div className="image">
                                <Image src={blog.image} alt={blog.title} quality={100} width={1000} height={600} />
                            </div>
                        )}
                        {renderContent(blog.content)}  {/* Render the dynamic content */}
                    </div>
                </div>
            </div>
        </>
    );
}