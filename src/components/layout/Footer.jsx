import Image from "next/image";
import OrangeCircle from '@/../public/images/orange-circle.svg';
import Current from '@/../public/images/current-img.svg';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import contactData from '../../files/contact.json';

const ModalSection = () => {
	const [book, setBook] = useState(false);

	const STORAGE_KEY = 'bookConsultationClosedTimestamp';

	const ONE_HOUR_MS = 60 * 60 * 1000;
	const DURATION_24_HOURS_MS = 24 * ONE_HOUR_MS;

	const handleBookClose = () => {
		setBook(false);

		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, Date.now().toString());
		}
	};

	const handleBookShow = () => setBook(true);

	const handleLetsTalkClick = () => {

		if (typeof window !== 'undefined' && contactData?.email) {

			const mailtoLink = `mailto:${contactData.email}?subject=${encodeURIComponent("REQUEST - Let's get started")}`;

			window.location.href = mailtoLink;

		} else {
			console.error("Email address is not configured or not on client side.");

		}

		handleBookClose();
	};

	useEffect(() => {
		let timerId;

		if (typeof window !== 'undefined') {
			const storedTimestamp = localStorage.getItem(STORAGE_KEY);
			const currentTime = Date.now();

			if (storedTimestamp) {
				const lastClosedTime = parseInt(storedTimestamp, 10);

				if (currentTime - lastClosedTime < DURATION_24_HOURS_MS) {
					console.log("Modal recently closed (less than 24 hours ago). Auto-popup suppressed.");

					return;
				} else {

					localStorage.removeItem(STORAGE_KEY);
					console.log("Modal closed more than 24 hours ago. Auto-popup timer will start.");
				}
			} else {
				console.log("No previous modal closure recorded. Auto-popup timer will start.");
			}

			timerId = setTimeout(() => {

				const currentStoredTimestamp = localStorage.getItem(STORAGE_KEY);
				const currentCheckTime = Date.now();

				if (currentStoredTimestamp) {
					const currentLastClosedTime = parseInt(currentStoredTimestamp, 10);
					if (currentCheckTime - currentLastClosedTime < DURATION_24_HOURS_MS) {
						console.log("Modal recently closed in another tab while timer ran. Aborting show.");
						return;
					}
				}

				setBook(true);
				console.log("15 seconds passed. Showing modal.");

			}, 1000);
		}

		return () => {

			if (timerId) {
				clearTimeout(timerId);
			}
		};

	}, []);

	return (
		<>
			<Modal show={book} onHide={handleBookClose} className="bookpop_section" centered>
				{/* Using onHide on Modal.Header's closeButton is sufficient, handleBookClose is called */}
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<div className="orange_circle">
						<Image src={OrangeCircle} alt="orangecircle" quality={100} />
					</div>
					<div className="current_img">
						<Image src={Current} alt="Current" quality={100} />
					</div>
					<div className="caption">
						{/* Keeping the h3 and p as you had in the last snippet */}
						<h3 className="mb-3 popup-head">Book Consultation</h3>
						<p>Want to Start a New project? Be the earliest one to get a meeting with our experts & get the right advice for your need.</p>
					</div>
					<div className="button_box">
						{/* Update the onClick handler for the "Let's talk" button */}
						<Button variant="secondary" onClick={handleLetsTalkClick}>
							Let's talk
						</Button>
						{/* The "Not Interested" button keeps the old handler */}
						<Button variant="primary" onClick={handleBookClose}>
							Not Interested
						</Button>
					</div>
				</Modal.Body>
			</Modal>

		</>
	)
}

export default ModalSection;