import Head from 'next/head';
import ProjectDetailBanner from '@/components/ProjectDetailBanner';
import ProjectDetailContent from '@/components/ProjectDetailContent';
import ProjectDetailImage from '@/components/ProjectDetailImage';
import metaData from '../../files/meta.json';
import Breadcrumb from '@/components/Breadcrumb';
import breadcrumbData from '../../files/breadcrumbs.json';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getStaticPaths() {
  const projects = require('../../files/projects.json');
  const paths = projects.map(project => ({
    params: { id: project.link },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const projects = require('../../files/projects.json');
  const project = projects.find(project => project.link === params.id);

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
  if (!project) {
    return <div>Project Not Found</div>;
  }

  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    // --- Logic to derive parent path ---
    const pathSegments = router.pathname.split('/').filter(Boolean); // e.g., ['projects', '[id]']
    let parentPath = '/'; // Default to root
    if (pathSegments.length > 1) {
      parentPath = '/' + pathSegments.slice(0, -1).join('/'); // e.g., "/projects"
    }
    // --- End Parent Path Logic ---

    // Look up the parent's breadcrumbs in the JSON
    const parentBreadcrumbs = breadcrumbData[parentPath];

    // Check if we found parent items and have current project data
    if (parentBreadcrumbs && project?.title && router.asPath) {
      // IMPORTANT: Create a deep copy of parent items to avoid modifying original JSON data
      const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));

      // Create the item for the current project page
      const currentProjectItem = {
        name: project.title, // Use the fetched project title
        href: router.asPath  // Use the actual URL
      };

      // Append the current project item to the copied parent items
      itemsCopy.push(currentProjectItem);

      setBreadcrumbItems(itemsCopy); // Set state with the full breadcrumb trail

    } else {
      // Fallback: If parent isn't in JSON or data missing, default to Home
      setBreadcrumbItems(breadcrumbData['/'] || []);
    }

  }, [router.pathname, router.asPath, project?.title]);

  // Dynamically create customMeta from the project data
    const customMeta = {
        title: `${project.title} | Comsci`, //Combine project title with your brand
        description: project.description, //Use the project's short description
        keywords: project.keywords || [], //add keywords if available in your project data. otherwise leave as empty array.
        og: {
            title: `${project.title} | Comsci`,
            description: project.description,
            image: project.image, // Assuming you have an ogImage property in your project data
            imageAlt: `Project image for ${project.title}`,
         },
        twitter: {  // Similar to og, adapt as needed for Twitter
           title: `${project.title} | Comsci`,
            description: project.description,
            image: project.image || project.ogImage, // Use a specific Twitter image or fallback to ogImage
            imageAlt: `Project image for ${project.title}`, 
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
        }).filter(Boolean); //this will remove any null meta tags that might have been returned in the previous step
      };


  return (
    <>
      <Head>        
        {getMetaTags(metaData, customMeta)}
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <ProjectDetailImage project={project} />
    </>
  );
}