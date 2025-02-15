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
							<ContentBox title="Discover the Answers You Seek" text="Unlock insights and find the information you're seeking with our FAQ section. Dive into a curated collection of commonly asked questions, offering clear and concise answers to guide you effortlessly through your queries." />
						</div>
						<Accordion defaultActiveKey="0"> {/*Removed defaultActiveKey prop value.  This will prevent an error in case there is no data */}
							{faqs.map((faq, index) => (
								<Accordion.Item eventKey={index} key={index}> {/* Use index as key */}
									<Accordion.Header>{faq.question}</Accordion.Header>
									<Accordion.Body>
										{faq.answer}  {/*Added dangerouslySetInnerHTML. This is generally not recommended for security reasons unless you completely trust the source of your HTML content */}
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