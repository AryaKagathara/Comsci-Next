import Head from "next/head";
import { useRouter } from 'next/router';
import ProjectPage from "@/components/ProjectPage";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';

import breadcrumbData from '../files/breadcrumbs.json';

import allProjectsData from '../files/projects.json';

import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Projects({ projectsData }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const pageUrl = `${BASE_URL}${router.asPath}`;

  const customMeta = {
    title: "Comsci | Portfolio of Design & Development Projects",
    description: "Explore Comsci's project portfolio showcasing innovative web, app, and custom software development. See our tailored solutions for global clients.",
    keywords: [
      "comsci projects",
      "design development portfolio",
      "web design projects",
      "mobile app development examples",
      "custom software development cases",
      "digital solutions portfolio",
      "branding project examples",
      "agency work portfolio",
      "past projects design dev",
      "client success stories",
      "software portfolio",
      "digital transformation projects"
    ],
    og: {
      title: "Comsci Portfolio: Innovative Design & Development Projects",
      description: "See how Comsci transforms businesses with cutting-edge web, app, and custom software solutions. Explore our project portfolio.",
      url: pageUrl,
    },
    twitter: {
      title: "Comsci Portfolio: Innovative Design & Development Projects",
      description: "See how Comsci transforms businesses with cutting-edge web, app, and custom software solutions. Explore our project portfolio.",
      url: pageUrl,
    },
    author: "Comsci - Arya Kagathara"
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
    "@type": "CollectionPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": currentPageMeta.title,
    "description": currentPageMeta.description,
    "isPartOf": {
      "@id": websiteSchema["@id"]
    },

    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projectsData.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": project.title,

        "url": `${BASE_URL}/projects/${project.link}`
      }))
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
      {/* Pass projectsData to your component if it needs it for rendering */}
      <ProjectPage projects={projectsData} />
      <TestimonialsSection />
      <TestiMonialsSlider />
    </>
  );
}

export async function getStaticProps() {

  const projectsData = allProjectsData;

  return {
    props: {
      projectsData,
    },
  };
}