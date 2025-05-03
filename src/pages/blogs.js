import Head from "next/head";
import { useRouter } from 'next/router';
import BlogpageSection from "@/components/BlogpageSection";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import allBlogsData from '../files/blogs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Blogs({ blogsData }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
"title": "Comsci Blog | Design & Development Insights & Trends",
    "description": "Stay ahead with the Comsci blog. Get expert insights & the latest trends in design & development, web, app, software, AI, & branding.",
    "keywords": [
      "comsci blog", "design development blog", "web design blog", "app development blog", "software development insights", "branding blog", "AI industry trends", "digital marketing blog", "expert advice tech", "artificial intelligence solutions blog", "insights design development", "latest tech trends"
    ],
    og: {
      title: "Blogs Comsci: Start Your Digital Project",
      description: "Stay ahead with the Comsci blog. Get expert insights & the latest trends in design & development, web, app, software, AI, & branding.",
      url: pageUrl,
    },
    twitter: {
      title: "Contact Comsci: Start Your Digital Project",
      description: "Stay ahead with the Comsci blog. Get expert insights & the latest trends in design & development, web, app, software, AI, & branding.",
      url: pageUrl,
    },
    author: "Comsci - Arya Kagathara",
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
      if (typeof mergedMeta[key] === 'string') {
        return <meta key={key} name={key} content={mergedMeta[key]} />;
      }
      return null;
    });
  };

  const currentPageMeta = { ...baseMetaData, ...customMeta };

  const pageSchema = {

    "@type": "Blog",
    "@id": pageUrl,
    "url": pageUrl,
    "name": currentPageMeta.title,
    "description": currentPageMeta.description,
    "isPartOf": {
      "@id": websiteSchema["@id"]
    },
    "publisher": {
      "@id": organizationSchema["@id"]
    },

    "blogPost": blogsData.map((blog, index) => ({

      "@type": "BlogPosting",

      "@id": `${BASE_URL}/blogs/${blog.link}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blogs/${blog.link}`
      },
      "headline": blog.title,
      "description": blog.subtitle || blog.title,

      "image": `${BASE_URL}${blog.image}`,
      "author": {
        "@type": "Person",
        "name": blog.author
      },

      "datePublished": new Date(blog.date.split('-').reverse().join('-')).toISOString(),

      "dateModified": new Date(blog.date.split('-').reverse().join('-')).toISOString()
    }))
  };

  let breadcrumbSchema = null;
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`
      }))
    };
  }

  const finalSchema = [
    organizationSchema,
    websiteSchema,
    pageSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : [])
  ];

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
      {/* Pass blogsData to your component that renders the blog list */}
      <BlogpageSection blogs={blogsData} />
    </>
  );
}

export async function getStaticProps() {

  const blogsData = allBlogsData;

  return {
    props: {
      blogsData,
    },
  };
}