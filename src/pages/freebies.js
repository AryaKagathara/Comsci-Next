import Head from "next/head";
import { useRouter } from 'next/router';
import BooksSection from "@/components/layout/BooksSection";
import Breadcrumb from '@/components/Breadcrumb';

import baseMetaData from '../files/meta.json';
import breadcrumbData from '../files/breadcrumbs.json';
import { organizationSchema, websiteSchema, BASE_URL } from '../lib/commonSchema';

export default function Books({ booksData = [] }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const breadcrumbItems = breadcrumbData[currentPath] || breadcrumbData['/'];

  const customMeta = {
    "title": "Download Creative Books - Comsci: Design & Development Insights",
    "description": "Learn about Designing, Logo, Branding, Typography, UX/UI. Download free eBooks from Comsci Technologies.",
    "keywords": [
       "design ebooks", "branding books", "logo design book", "typography books", "UX UI books", "free design books", "visual concept books", "comsci ebooks" // Expanded keywords
    ],
    "og": {
      "title": "Free Design & Development eBooks | Comsci Technologies",
      "description": "Expand your knowledge in branding, design, and development with free downloadable eBooks from Comsci Technologies."
    },
    "robots": "index, follow",
    "author": "Comsci"
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
      "itemListElement": booksData.map((book, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Book",
            "@id": `${pageUrl}#${book.slug || book.id}`,
            "name": book.title,
            "description": book.shortDescription || book.description || currentPageMeta.description,
             "author": {
                 "@id": organizationSchema["@id"]
            },
            "publisher": {
                 "@id": organizationSchema["@id"]
            },
            "url": `${pageUrl}#${book.slug || book.id}`,
            "image": book.image ? `${BASE_URL}${book.image}` : (organizationSchema.logo || ''),
            "bookFormat": "http://schema.org/EBook"
        }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
          key="jsonld-schema"
        />
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <BooksSection books={booksData} />
    </>
  )
}

export async function getStaticProps() {
  let booksData = [];
  try {
    console.warn("Book data (books.json) not found or implemented yet for schema generation.");
  } catch (error) {
    console.error("Error loading book data:", error);
  }

  return {
    props: {
      booksData,
    },
  };
}