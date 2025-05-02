import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectDetailBanner from '@/components/ProjectDetailBanner';
import ProjectDetailContent from '@/components/ProjectDetailContent';
import ProjectDetailImage from '@/components/ProjectDetailImage';
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../../files/meta.json';

import breadcrumbData from '../../files/breadcrumbs.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../../lib/commonSchema';

export async function getStaticPaths() {
  const projects = require('../../files/projects.json');
  const paths = projects.map(project => ({

    params: { id: project.link },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const projects = require('../../files/projects.json');
  const project = projects.find(p => p.link === params.id);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
}

export default function ProjectDetail({ project }) {
  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathSegments = router.pathname.split('/').filter(Boolean);
    let parentPath = '';
    if (pathSegments.length > 1) {
      parentPath = '/' + pathSegments.slice(0, -1).join('/');
    } else {
       parentPath = '/';
    }

    const parentBreadcrumbs = breadcrumbData[parentPath];

    if (parentBreadcrumbs && project?.title && router.asPath) {
      const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
      const currentProjectItem = {
        label: project.title,
        name: project.title,
        href: router.asPath
      };
      itemsCopy.push(currentProjectItem);
      setBreadcrumbItems(itemsCopy);
    } else {
      // Fallback to root breadcrumbs or empty array if no match
      setBreadcrumbItems(breadcrumbData['/'] || []);
    }
  }, [router.pathname, router.asPath, project?.title]);


  if (!project) {
    // Should ideally not be reached due to getStaticProps notFound,
    // but provides a client-side fallback if rendering issues occur.
    return <div>Project Not Found</div>;
  }

  // Construct full image URL for social shares and schema
  const fullImageUrl = project.image ?
    (project.image.startsWith('http') ? project.image : `${BASE_URL}${project.image}`)
    : `${BASE_URL}/images/social-share-og/Facebook.webp`; // Default image if none provided


  // --- Combine Keywords, Categories, and Industries ---
  // Filter out any potential null/undefined/non-string values and duplicates
  const allKeywords = [
      ...(project.keywords || []),        // Add existing keywords
      ...(project.category || []),         // Add categories
      ...(project.industry || [])         // Add industries
  ].filter(kw => typeof kw === 'string' && kw.trim() !== ''); // Basic validation

  const uniqueKeywords = Array.from(new Set(allKeywords)); // Remove duplicates
  const keywordsString = uniqueKeywords.join(', '); // Comma-separated string for schema

  // --- Custom Meta Tags ---
  const customMeta = {
      title: `${project.title} | Comsci Project`,
      // Use project description for the primary description meta tag
      description: project.description,
      // Use the unique array of combined keywords for the <meta name="keywords"> tag
      keywords: uniqueKeywords,
      // og tags - Keep description concise
      og: {
          title: `${project.title} | Comsci Project`,
          description: project.description, // Consider making OG description shorter if main is very long
          image: fullImageUrl,
          imageAlt: project.alt || `Showcase image for ${project.title}`, // Use project.alt if available
          url: `${BASE_URL}${router.asPath}`, // Add URL tag for OG
          type: 'article', // Type article often fits project showcases with substantial content
      },
      // twitter tags - Keep description concise
      twitter: {
         card: 'summary_large_image', // Use large image card type
         title: `${project.title} | Comsci Project`,
          description: project.description, // Consider making Twitter description shorter
          image: fullImageUrl,
          imageAlt: project.alt || `Showcase image for ${project.title}`, // Use project.alt if available
      },
       // robots tag (often from baseMetaData, ensure it's considered)
       robots: baseMetaData.robots || 'index, follow', // Use base or provide a default
  };

  // Helper function to generate meta tags (slightly improved filtering)
  const getMetaTags = (metaData, customMeta = {}) => {
    const mergedMeta = { ...metaData, ...customMeta };
    if (customMeta.og) mergedMeta.og = { ...metaData.og, ...customMeta.og };
    if (customMeta.twitter) mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter };

    return Object.keys(mergedMeta).map((key) => {
      const value = mergedMeta[key];

      if (key === "title" && typeof value === 'string') return <title key={key}>{value}</title>;

      if (key === "og" || key === "twitter") {
        if (typeof value === 'object' && value !== null) {
          return Object.keys(value).map((property) => (
             // Handle nested objects (like image objects with url, width, height, etc.) if your schema has them
            typeof value[property] === 'string' ?
             <meta key={`${key}:${property}`} property={`${key}:${property}`} content={value[property]} />
             : null // Don't render meta tag for non-string values in OG/Twitter direct properties
          )).filter(Boolean); // Filter out null entries
        }
        return null; // Skip if og/twitter is not a valid object
      }

      // This part already correctly handles Array keywords and joins them
      if (key === "keywords" && Array.isArray(value)) {
          return value.length > 0 ? <meta key={key} name={key} content={value.join(', ')} /> : null; // Render only if keywords exist
      }

       if (key === "robots" && typeof value === 'string') return <meta key={key} name={key} content={value} />;

       // Handle other string meta tags (description, author, etc.)
       if (key !== 'og' && key !== 'twitter' && key !== 'title' && key !== 'keywords' && typeof value === 'string') {
           return <meta key={key} name={key} content={value} />;
       }
       return null; // Ignore unexpected types or keys already handled
    }).filter(Boolean); // Filter out null entries from the outer map as well
  };


  // --- JSON-LD Schema Markup ---
  const pageUrl = `${BASE_URL}${router.asPath}`;

  const pageSchema = {
    // Choose a schema type appropriate for showcasing a project.
    // 'Article' is good if there is significant descriptive content.
    // 'CreativeWork' or 'Product' could also be considered depending on context.
    // Let's stick with 'Article' as in your original code.
    "@type": "Article",
    "@id": pageUrl,
    "url": pageUrl,
    "headline": project.title,
    "name": project.title,
    "description": project.description, // Use project description
    // Relationships to site/org schemas
    "isPartOf": {
      "@id": websiteSchema["@id"] // Link to the overall website schema
    },
    "publisher": {
      "@id": organizationSchema["@id"] // Link to the organization schema
    },
    "author": { // Credit the organization as the author of the content/page
      "@id": organizationSchema["@id"]
    },
    // Image object for the schema
    "image": {
       "@type": "ImageObject",
       "url": fullImageUrl,
       "caption": project.alt || `Showcase image for ${project.title}`, // Use alt text if available
       // Consider adding width/height if known for the main image
       // "width": 1200, // Example
       // "height": 630 // Example
    },

     // Add combined keywords string to schema
     "keywords": keywordsString.length > 0 ? keywordsString : undefined, // Include only if there are keywords

     // You could also add 'articleSection' or 'about' more semantically,
     // but adding to 'keywords' fulfills the request directly. Example of 'about':
     /*
     "about": [
        ...(project.category || []).map(cat => ({ "@type": "Thing", "name": cat })),
        ...(project.industry || []).map(ind => ({ "@type": "Thing", "name": ind })),
     ].filter(item => item.name), // Filter out items with no name
     */

     // Link back to the page itself as the main entity
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": pageUrl
     },
     // Consider adding publication dates if they exist in your data
     // "datePublished": "YYYY-MM-DD",
     // "dateModified": "YYYY-MM-DD"
  };

  // --- Breadcrumb Schema ---
  let breadcrumbSchema = null;
  if (breadcrumbItems && breadcrumbItems.length > 0) {
      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name || item.label, // Use 'name' first for schema, fallback to 'label'
            // Construct full URL for breadcrumb items
            "item": item.href.startsWith('/') ? `${BASE_URL}${item.href}` : item.href
        }))
      };
  }

  // Final array of schema objects
  const finalSchema = [
      organizationSchema, // Your base organization schema
      websiteSchema,      // Your base website schema
      pageSchema,         // The schema for the current project page
      ...(breadcrumbSchema ? [breadcrumbSchema] : []) // Add breadcrumb schema if generated
  ];

  return (
    <>
      {/* Head component for meta tags and schema */}
      <Head>
        {/* Generate standard meta tags using the merged metadata */}
        {getMetaTags(baseMetaData, customMeta)}
        <link rel="canonical" href={pageUrl} key="canonical-link" />

        {/* Add the JSON-LD Schema script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
          key="jsonld-schema" // Unique key for React rendering
        />
      </Head>

      {/* Render other page components */}
      <Breadcrumb items={breadcrumbItems} />
      {/* <ProjectDetailBanner project={project} /> */}
      <ProjectDetailImage project={project} />
      <ProjectDetailContent project={project} /> 
    </>
  );
}