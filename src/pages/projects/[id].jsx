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
    let parentPath = '/';
    if (pathSegments.length > 1) {
      parentPath = '/' + pathSegments.slice(0, -1).join('/');
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
      setBreadcrumbItems(breadcrumbData['/'] || []);
    }
  }, [router.pathname, router.asPath, project?.title]);

  if (!project) {
    
    return <div>Project Not Found</div>; 
  }

  const fullImageUrl = project.image ? (project.image.startsWith('http') ? project.image : `${BASE_URL}${project.image}`) : `${BASE_URL}/images/social-share-og/Facebook.webp`; 
  const customMeta = {
      title: `${project.title} | Comsci Project`, 
      description: project.description, 
      
      keywords: project.keywords || [], 
      og: {
          title: `${project.title} | Comsci Project`,
          description: project.description,
          image: fullImageUrl,
          imageAlt: `Showcase image for ${project.title}`, 
      },
      twitter: {
         
         title: `${project.title} | Comsci Project`,
          description: project.description,
          image: fullImageUrl,
          imageAlt: `Showcase image for ${project.title}`,
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

  const pageSchema = {
    
    "@type": "Article",
    "@id": pageUrl,
    "url": pageUrl,
    "headline": project.title, 
    "name": project.title, 
    "description": project.description,
    "isPartOf": { 
      "@id": websiteSchema["@id"]
    },
    "publisher": { 
      "@id": organizationSchema["@id"]
    },
    "author": { 
      "@id": organizationSchema["@id"]
    },
    "image": { 
       "@type": "ImageObject",
       "url": fullImageUrl, 
       "caption": `Showcase for ${project.title}`
       
    },
    
     "keywords": project.keywords ? project.keywords.join(', ') : (customMeta.keywords ? customMeta.keywords.join(', ') : undefined),
    
     "mainEntityOfPage": { 
       "@type": "WebPage",
       "@id": pageUrl
     }
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
  
  return (
    <>
      <Head>
        {getMetaTags(baseMetaData, customMeta)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }} 
          key="jsonld-schema"
        />
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectDetailImage project={project} />
    </>
  );
}