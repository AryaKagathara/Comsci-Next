import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectDetailBanner from '@/components/ProjectDetailBanner'; // Assuming these components are still needed
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

    // Assuming breadcrumbData structure has paths like "/projects"
    // Adjust this logic if your breadcrumb data source works differently
    const parentBreadcrumbs = breadcrumbData[parentPath] || breadcrumbData[pathSegments[0]]; // Try /projects or just 'projects' key


    if (parentBreadcrumbs && project?.title && router.asPath) {
      const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));
      const currentProjectItem = {
        label: project.title,
        name: project.title, // Use title for schema name too
        href: router.asPath
      };
      itemsCopy.push(currentProjectItem);
      setBreadcrumbItems(itemsCopy);
    } else {
      // Fallback to a default or empty array if no match
       const defaultItems = breadcrumbData['/'] || []; // Use root or empty if no root data
       if(project?.title && router.asPath) {
            setBreadcrumbItems([...defaultItems, { label: project.title, name: project.title, href: router.asPath }]);
       } else {
           setBreadcrumbItems(defaultItems);
       }
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
      // Use meta_title from JSON
      title: project.meta_title,
      // Use meta_description from JSON
      description: project.meta_description,
      // Use the unique array of combined keywords for the <meta name="keywords"> tag
      keywords: uniqueKeywords,
      // og tags - Use meta_title and meta_description from JSON
      og: {
          title: project.meta_title, // Use dedicated meta title for OG
          description: project.meta_description, // Use dedicated meta description for OG
          image: fullImageUrl,
          imageAlt: project.alt || `Showcase image for ${project.title}`, // Use project.alt if available
          url: `${BASE_URL}${router.asPath}`, // Add URL tag for OG
          type: 'article', // Type article often fits project showcases with substantial content
      },
      // twitter tags - Use meta_title and meta_description from JSON
      twitter: {
         card: 'summary_large_image', // Use large image card type
         title: project.meta_title, // Use dedicated meta title for Twitter
         description: project.meta_description, // Use dedicated meta description for Twitter
          image: fullImageUrl,
          imageAlt: project.alt || `Showcase image for ${project.title}`, // Use project.alt if available
      },
       // robots tag (often from baseMetaData, ensure it's considered)
       robots: baseMetaData.robots || 'index, follow', // Use base or provide a default
       // Author tag
       author: baseMetaData.author || 'Comsci',
  };

  // Helper function to generate meta tags (slightly improved filtering)
  // Assuming this helper is already defined and working correctly or provided elsewhere
  // Keeping the provided helper for context, assuming it's what you use.
  // If you are using next/head's array format directly, this helper might be simplified.
  // For direct array format you'd return the array of elements directly from the customMeta object structure.

   // A simpler way using next/head's array format, assumes Head can handle the standard key names:
   const headMetaTags = [
    <title key="title">{customMeta.title}</title>,
    <meta key="description" name="description" content={customMeta.description} />,
     ...(Array.isArray(customMeta.keywords) && customMeta.keywords.length > 0 ?
      [<meta key="keywords" name="keywords" content={customMeta.keywords.join(', ')} />]
      : []),
    <meta key="robots" name="robots" content={customMeta.robots} />,
    <meta key="author" name="author" content={customMeta.author} />,

    // OG tags
    ...(customMeta.og ? [
        <meta key="og:title" property="og:title" content={customMeta.og.title} />,
        <meta key="og:description" property="og:description" content={customMeta.og.description} />,
        <meta key="og:type" property="og:type" content={customMeta.og.type} />,
        <meta key="og:url" property="og:url" content={customMeta.og.url} />,
         ...(customMeta.og.image ? [<meta key="og:image" property="og:image" content={customMeta.og.image} />] : []),
         ...(customMeta.og.imageAlt ? [<meta key="og:image:alt" property="og:image:alt" content={customMeta.og.imageAlt} />] : []),
        // Add width/height if you add them to your og object later
       // ...(customMeta.og.image?.width ? [<meta key="og:image:width" property="og:image:width" content={customMeta.og.image.width} />] : []),
       // ...(customMeta.og.image?.height ? [<meta key="og:image:height" property="og:image:height" content={customMeta.og.image.height} />] : []),
    ] : []),

     // Twitter tags
     ...(customMeta.twitter ? [
        <meta key="twitter:card" name="twitter:card" content={customMeta.twitter.card} />,
        <meta key="twitter:title" name="twitter:title" content={customMeta.twitter.title} />,
        <meta key="twitter:description" name="twitter:description" content={customMeta.twitter.description} />,
        ...(customMeta.twitter.image ? [<meta key="twitter:image" name="twitter:image" content={customMeta.twitter.image} />] : []),
         ...(customMeta.twitter.imageAlt ? [<meta key="twitter:image:alt" name="twitter:image:alt" content={customMeta.twitter.imageAlt} />] : []),
     ] : []),

      // Canonical URL
     <link rel="canonical" href={customMeta.og.url} key="canonical-link" /> // Assuming og.url is the correct canonical URL
   ];


  // --- JSON-LD Schema Markup ---
  const pageUrl = customMeta.og.url; // Use the same URL from meta tags

  const pageSchema = {
    // Choose a schema type appropriate for showcasing a project.
    "@context": "https://schema.org", // Add context here
    "@type": "Article", // Keeping Article as previously used, consider 'CreativeWork'
    "@id": pageUrl,
    "url": pageUrl,
    "headline": project.title, // Using the project title here is fine
    "name": project.title, // Using the project title here is fine
    "description": project.description, // Using the main project description might be best for detailed schema description

    // Relationships to site/org schemas - ensure organizationSchema & websiteSchema are defined
    // You need to define these globally or import them correctly in lib/commonSchema.js
    ...(organizationSchema ? { "publisher": { "@id": organizationSchema["@id"] }, "author": { "@id": organizationSchema["@id"] } } : {}),
    ...(websiteSchema ? { "isPartOf": { "@id": websiteSchema["@id"] } } : {}),


    // Image object for the schema - using fullImageUrl derived earlier
    ...(customMeta.og?.image && customMeta.og?.imageAlt ? {
       "image": {
          "@type": "ImageObject",
          "url": customMeta.og.image,
          "caption": customMeta.og.imageAlt,
          // Consider adding width/height if known
          // "width": 1200,
          // "height": 630
       }
    } : {}),


     // Add combined keywords string to schema (using the comma-separated string)
     "keywords": keywordsString.length > 0 ? keywordsString : undefined,

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
   // Check if breadcrumbItems exist and have more than 0 items
  if (breadcrumbItems && breadcrumbItems.length > 0) {
      breadcrumbSchema = {
        "@context": "https://schema.org", // Context also needed for this schema
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

  // Final array of schema objects - ensure organizationSchema, websiteSchema are available
  const finalSchema = [
      ...(organizationSchema ? [organizationSchema] : []), // Add org schema if available
      ...(websiteSchema ? [websiteSchema] : []),      // Add site schema if available
      pageSchema,         // The schema for the current project page
      ...(breadcrumbSchema ? [breadcrumbSchema] : []) // Add breadcrumb schema if generated
  ];

  return (
    <>
      {/* Head component for meta tags and schema */}
      <Head>
         {/* Render standard meta tags and canonical */}
         {headMetaTags}

        {/* Add the JSON-LD Schema script */}
         {finalSchema && finalSchema.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
                key="jsonld-schema" // Unique key for React rendering
              />
         )}
      </Head>

      {/* Render other page components */}
      {/* Render breadcrumb only if items exist */}
       {breadcrumbItems && breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
      {/* <ProjectDetailBanner project={project} /> */}
      <ProjectDetailImage project={project} />
      <ProjectDetailContent project={project} />
    </>
  );
}