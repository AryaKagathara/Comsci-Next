import ContentBox from "@/components/layout/ContentBox";
import Accordion from 'react-bootstrap/Accordion';

const Faqsection = () => {
	return (
		<>
			<div className="faq">
				<div className="container">
					<div className="faq_section">
						<div className="text_box fadeInUp">
							<ContentBox title="Discover the Answers You Seek" text="Unlock insights and find the information you're seeking with our FAQ section. Dive into a curated collection of commonly asked questions, offering clear and concise answers to guide you effortlessly through your queries." />
						</div>
						<Accordion>
							<Accordion.Item eventKey="5">
								<Accordion.Header>What types of branding projects do you handle?</Accordion.Header>
								<Accordion.Body>At Comsci Technologies, we offer comprehensive branding services, including logo design, brand identity development, brand guidelines and style guides, packaging design, marketing collateral design, and more. We work with businesses of all sizes, from startups to well-established enterprises, across various industries.</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="6">
								<Accordion.Header>What's the difference between UX and UI design?</Accordion.Header>
								<Accordion.Body>UX design focuses on functionality and the overall user experience, while UI design focuses on visual aesthetics and user interface elements. However, they work hand-in-hand to deliver a cohesive and captivating user journey.</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="7">
								<Accordion.Header>How long does custom web development take?</Accordion.Header>
								<Accordion.Body>The timeline for custom web development can vary depending on the project's complexity, scope, and requirements. During our initial consultation, we will provide you with a detailed project plan and timeline to ensure transparency and effective communication throughout the development process.</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="8">
								<Accordion.Header>Can you work with my existing website, or do I need to start from scratch?</Accordion.Header>
								<Accordion.Body>Absolutely, we can work with your existing website and optimize it for better search engine performance. However, in some cases, it may be more efficient to start with a new, optimized website, particularly if your current website has significant technical or structural issues.</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="9">
								<Accordion.Header>What types of websites and web applications do you develop?</Accordion.Header>
								<Accordion.Body>We have expertise in developing a wide range of web solutions, including corporate websites, eCommerce platforms, SaaS applications, finance and accounting software, HR and recruitment systems, healthcare applications, and more. Our custom approach ensures that we can cater to businesses across various industries and sectors.</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="10">
								<Accordion.Header>What is your approach to app security and data privacy?</Accordion.Header>
								<Accordion.Body>Security and data privacy are of utmost importance in mobile app development. We follow industry best practices and adhere to the latest security standards to protect your app and your users' data from potential vulnerabilities and threats. We also ensure compliance with relevant data privacy regulations, such as GDPR and CCPA.</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</div>
				</div>
			</div>
		</>
	)
}

export default Faqsection;