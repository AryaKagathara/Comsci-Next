import ContentBox from "@/components/layout/ContentBox";
import Accordion from 'react-bootstrap/Accordion';
import faqsData from '../../files/faqs.json'; // Import the JSON data


const Faqsection = () => {
    const faqs = faqsData;

	return (
		<>
			<div className="faq">
				<div className="container">
					<div className="faq_section">
						<div className="text_box fadeInUp">
							<ContentBox title="Frequently Asked Questions (FAQs)" text="Find answers to common questions about our design, development, branding, and SEO services. Contact us if you don't see your question here." />
						</div>
						<Accordion defaultActiveKey="0">
							{faqs.map((faq, index) => (
								<Accordion.Item eventKey={index} key={index}>
									<Accordion.Header>{faq.question}</Accordion.Header>
									<Accordion.Body>
										{faq.answer} 
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</>
	)
}

export default Faqsection;