import Head from "next/head";
import ErrorSection from "@/components/layout/ErrorSection";
import Link from "next/link"; // Import the Link component
import metaData from '../files/meta.json'; // Import default meta data


function NotFoundPage() {

	const customMeta = {
		title: "Page Not Found - 404 Error | Comsci Technologies",
		description: "Oops! The page you're looking for can't be found.  Return to the Comsci Technologies homepage.",
		og: { //It's OK to have basic OG data for a 404 page
			title: "404 Error - Page Not Found", //Generic title for social media (if shared, which is unlikely)
			description: "We can't seem to find the page you are looking for.  Go back to the Comsci Technologies website.",
		},
		robots: "noindex, nofollow", // Prevent search engines from indexing

	};


	const getMetaTags = (metaData, customMeta = {}) => {
		const mergedMeta = { ...metaData, ...customMeta };

		if (customMeta.og) {
			mergedMeta.og = { ...metaData.og, ...customMeta.og };
		}


		return Object.keys(mergedMeta).map((key) => {


			if (key === "title") {
				return <title key={key}>{mergedMeta[key]}</title>;
			}
			if (key === "og") {
				return Object.keys(mergedMeta[key]).map((property) => (
					<meta key={`${key}:${property}`} property={`${key}:${property}`} content={mergedMeta[key][property]} />
				));
			}
			return <meta key={key} name={key} content={mergedMeta[key]} />;

		});
	};



	return (
		<>
			<Head>
				{getMetaTags(metaData, customMeta)}
			</Head>
			<ErrorSection />
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<p>Return to the <Link href="/">Homepage</Link>.</p> 
			</div>

		</>
	)
}

export default NotFoundPage;