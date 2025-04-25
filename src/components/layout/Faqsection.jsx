import ContentBox from "@/components/layout/ContentBox";
import Accordion from 'react-bootstrap/Accordion';
// Remove the import of the general faqs.json unless needed as a fallback somewhere else
// import faqsData from '../../files/faqs.json';

// Accept props: faqs, title, text
const Faqsection = ({ faqs, title = "Frequently Asked Questions (FAQs)", text = "" }) => {

    // Ensure faqs is an array before mapping
    const faqList = Array.isArray(faqs) ? faqs : [];

	// Don't render the component if there are no FAQs
	if (faqList.length === 0) {
		return null;
	}

	return (
		<>
			{/* Keep the outer structure if needed for styling */}
			<div className="faq">
				<div className="container">
					<div className="faq_section">
						{/* Conditionally render the text box only if title or text is provided */}
						{(title || text) && (
							<div className="text_box fadeInUp">
								<ContentBox title={title} text={text} />
							</div>
						)}
						<Accordion defaultActiveKey="0">
							{/* Map over the passed 'faqs' prop */}
							{faqList.map((faq, index) => (
								// Ensure eventKey is a string for React Bootstrap
								<Accordion.Item eventKey={index.toString()} key={index}>
									<Accordion.Header>{faq.question}</Accordion.Header>
									<Accordion.Body>
										{/* You might want to sanitize or allow specific HTML if needed */}
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