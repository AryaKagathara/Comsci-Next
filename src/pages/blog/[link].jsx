import Head from "next/head";
import Image from "next/image";
import React from 'react';
import metaData from '../../files/meta.json';

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