import Image from "next/image";
import OrangeCircle from '@/../public/images/orange-circle.svg';
import Current from '@/../public/images/current-img.svg';
import Novice from '@/../public/images/novice-img.svg';
import Work from '@/../public/images/popup-work-img.svg';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContentBox from "@/components/layout/ContentBox";

const ModalSection = () => {
	const [book, setBook] = useState(false);
	const handleBookClose = () => setBook(false);
	const handleBookShow = () => setBook(true);

	// const [guide, setGuide] = useState(false);
	// const handleGuideClose = () => setGuide(false);
	// const handleGuideShow = () => setGuide(true);

	// const [work, setWork] = useState(false);
	// const handleWorkClose = () => setWork(false);
	// const handleWorkShow = () => setWork(true);

	return (
		<>
			<div className="book_popup">
				<div className="container">
					<Button variant="primary" onClick={handleBookShow}>
						book
					</Button>
					<Modal show={book} onHide={handleBookClose} className="bookpop_section" centered>
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							<div className="orange_circle">
								<Image src={OrangeCircle} alt="orangecircle" quality={100}/>
							</div>
							<div className="current_img">
								<Image src={Current} alt="Current" quality={100}/>
							</div>
							<div className="caption">
								<h3>Book Consultation</h3>
								<p>Want to Starting a New project? Be the earliest one to get a meeting with our experts & get the right advice for your need.</p>
							</div>
							<div className="button_box">
								<Button variant="secondary" onClick={handleBookClose}>
									Lets talk
								</Button>
								<Button variant="primary" onClick={handleBookClose}>
									Not Interested
								</Button>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>


			{/* <div className="guide_popup">
				<div className="container">
					<Button variant="primary" onClick={handleGuideShow}>
						guide
					</Button>
					<Modal show={guide} onHide={handleGuideClose} className="guidepop_section" centered>
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							<div className="orange_circle">
								<Image src={OrangeCircle} alt="orangecircle" quality={100}/>
							</div>
							<div className="current_img">
								<Image src={Novice} alt="Novice" quality={100}/>
							</div>
							<div className="caption">
								<ContentBox title="GUIDE FOR NOVICE" text="Starting a new project and don’t know where to start? How, What, Where, When, Which, Why. Take some time to read our guidance." />
							</div>
							<div className="button_box">
								<Button variant="secondary" onClick={handleGuideClose}>
									Find here
								</Button>
								<Button variant="primary" onClick={handleGuideClose}>
									Not Interested
								</Button>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>


			<div className="work_popup">
				<div className="container">
					<Button variant="primary" onClick={handleWorkShow}>
						work
					</Button>
					<Modal show={work} onHide={handleWorkClose} className="workpop_section" centered>
						<Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							<div className="orange_circle">
								<Image src={OrangeCircle} alt="orangecircle" quality={100}/>
							</div>
							<div className="current_img">
								<Image src={Work} alt="Work" quality={100}/>
							</div>
							<div className="caption">
								<ContentBox title="LOOKING FOR WORK" text="Freelancers, seekers, agencies – connect now! Explore ideal work opportunities with us. Your success starts here!" />
							</div>
							<div className="button_box">
								<Button variant="secondary" onClick={handleWorkClose}>
									Get in touch
								</Button>
								<Button variant="primary" onClick={handleWorkClose}>
									Not Interested
								</Button>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div> */}
		</>
	)
}

export default ModalSection;