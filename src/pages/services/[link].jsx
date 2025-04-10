// pages/services/[link].js
import Head from "next/head";
import Image from "next/image";
import React from 'react';
import InnerBanner from "@/components/layout/InnerBanner";
import ServiceProcess from "@/components/layout/ServiceProcess";
import ProjectSection from "@/components/ProjectSection";
import metaData from '../../files/meta.json';
import breadcrumbData from '../../files/breadcrumbs.json'; // Import breadcrumb data
import Breadcrumb from '@/components/Breadcrumb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// getStaticPaths
export async function getStaticPaths() {
	const servicesData = require('../../files/services.json'); //get the whole object {services:[], marquee:[]}
	const services = servicesData.services; //access the services array by it's key

	const paths = services.map(service => ({   //now map works
		params: { link: service.link }
	}));

	return { paths, fallback: false };
}


// getStaticProps
export async function getStaticProps({ params }) {
	const servicesData = require('../../files/services.json'); //get the whole object
	const services = servicesData.services //access the services array by it's key

	const service = services.find(service => service.link === params.link); //now find works

	if (!service) {
		return { notFound: true }
	}

	return { props: { service } };
}

const ServiceDetail = ({ service }) => {

	const router = useRouter();
	const [breadcrumbItems, setBreadcrumbItems] = useState([]); // State for breadcrumbs

    useEffect(() => {
        // --- Logic to derive parent path ---
        const pathSegments = router.pathname.split('/').filter(Boolean); // e.g., ['services', '[id]']
        let parentPath = '/'; // Default to root
        if (pathSegments.length > 1) {
          parentPath = '/' + pathSegments.slice(0, -1).join('/'); // e.g., "/services"
        }
        // --- End Parent Path Logic ---

        // Look up the parent's breadcrumbs in the JSON
        const parentBreadcrumbs = breadcrumbData[parentPath];

        // Check if parent items found & current service data exists
        if (parentBreadcrumbs && service?.title && router.asPath) {
          // Create a deep copy of parent items
          const itemsCopy = JSON.parse(JSON.stringify(parentBreadcrumbs));

          // Create the item for the current service page
          const currentServiceItem = {
            name: service.title, // Use the actual service title
            href: router.asPath   // Use the actual URL
          };

          // Append the current service item
          itemsCopy.push(currentServiceItem);
          setBreadcrumbItems(itemsCopy); // Update state

        } else {
          // Fallback to Home if parent not in JSON or data missing
          setBreadcrumbItems(breadcrumbData['/'] || []);
        }
    }, [router.pathname, router.asPath, service?.title]);

	const customMeta = {
		title: `${service.title} | Comsci Services`,
		description: service.shortDescription,
		keywords: service.keywords || [], //add keywords property to your services.json if you want to use this, otherwise it will be an empty array.
		og: {
			title: `${service.title} | Comsci Services`,
			description: service.shortDescription,
			image: service.image || '/path/to/default/social/image.jpg', // Provide a default image if service.image is missing, otherwise your social media preview will be blank/broken
			imageAlt: `Comsci's ${service.title} Service`,
		},
		twitter: {
			title: `${service.title} | Comsci Services`,
			description: service.shortDescription,
			image: service.image || '/path/to/default/social/image.jpg', //default image here as well
			imageAlt: `Comsci's ${service.title} Service`,
		},
	};

	const getMetaTags = (metaData, customMeta = {}) => {
		const mergedMeta = { ...metaData, ...customMeta };

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
			return null
		}).filter(Boolean);
	};

	const renderContent = (content) => {
		if (!content) return null; // Handle cases where content is empty

		return content.map((item, index) => {
			switch (item.tag) {
				case 'ul':
				case 'ol':
					const listItems = item.content.map((listItem, listIndex) => <li key={listIndex} dangerouslySetInnerHTML={{ __html: listItem.content }}></li>);
					return React.createElement(item.tag, { key: index }, listItems);
				case 'img':
					// Add width and height as props, not attributes
					return <div className="image" key={index}><Image src={item.image} alt={item.content || ''} width={item.width || 100} height={item.height || 100} quality={100} /></div>;
				default:
					if (item.content) {
						return React.createElement(item.tag, { key: index, dangerouslySetInnerHTML: { __html: item.content } });
					}
					return null;
			}
		});
	};

	return (
		<>
			<Head>
				{getMetaTags(metaData, customMeta)}
			</Head>
			<Breadcrumb items={breadcrumbItems} />
			<InnerBanner banner={service}/>
			<div className="process">
				<div className="container">
					<div className="process_section">
						<div className="row">
							<div className="col-lg-8">
								<div className="caption_box">
									<h2>{service.title}</h2>
									{renderContent(service.content)} {/* Render content here */}
								</div>
							</div>
							<div className="col-lg-3 offset-lg-1">
								<div className="box_wrap">
									<span>Process</span>
									<ul>
										{service.chips && service.chips.map((chip, index) => (
											<li key={index}>{chip.name}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ServiceProcess
				strategyTitle={service.strategy?.strategyTitle || "Default Title"}
				strategyDescription={service.strategy?.strategyDescription || "Default Description"}
				steps={service.strategy?.strategySteps || []} 
			/>
			<ProjectSection />
		</>
	);
};

export default ServiceDetail;