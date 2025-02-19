// pages/blog/[link].js
import Head from "next/head";
import Image from "next/image";
import React from 'react';

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
	const renderContent = (content) => {
		return content.map((item, index) => {
			if (item.tag === 'ul' || item.tag === 'ol') {
				const listItems = item.content.map((listItem, listIndex) => (
					<li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }} />
				));
				return React.createElement(item.tag, { key: index }, listItems);
			} else if (item.tag === 'img') {
				return <div className="image" key={index}><Image src={item.image} alt={item.content} quality={100} width={1000} height={600} /></div>;
			} else if (item.content) {
				return React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } });
			}
			return null;
		});
	};


    return (
        <>
            <Head>
                <title>{blog.title}</title>
                <meta name="description" content={blog.title} />
            </Head>

            <div className="blogdetail">
                <div className="container">
                    <div className="blogdetail_section">
                        <span>{blog.title}</span>
                        <div className="caption">
                            <i>{blog.category}</i>
                            <div className="dot"></div>
                            <i>{blog.date}</i>
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