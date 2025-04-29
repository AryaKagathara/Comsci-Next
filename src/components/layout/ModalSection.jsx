import Image from "next/image";
import OrangeCircle from '@/../public/images/orange-circle.svg';
import Current from '@/../public/images/current-img.svg';
import { useState, useEffect } from 'react'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalSection = () => {
	const [book, setBook] = useState(false);

    const STORAGE_KEY = 'bookConsultationClosedTimestamp';
    const DURATION_24_HOURS_MS = 24 * 60 * 60 * 1000; 

	const handleBookClose = () => {
        setBook(false);
        
        if (typeof window !== 'undefined') {
             localStorage.setItem(STORAGE_KEY, Date.now().toString());
        }
    };

	const handleBookShow = () => setBook(true);

    useEffect(() => {
        let timerId;

        if (typeof window !== 'undefined') {
            const storedTimestamp = localStorage.getItem(STORAGE_KEY);
            const currentTime = Date.now();

            if (storedTimestamp) {
                 const lastClosedTime = parseInt(storedTimestamp, 10);
                 
                 if (currentTime - lastClosedTime < DURATION_24_HOURS_MS) {
                    console.log("Modal recently closed, waiting 24 hours...");
                    
                    return;
                 } else {
                     
                     localStorage.removeItem(STORAGE_KEY);
                      console.log("Modal closed more than 24 hours ago. Timer will start.");
                 }
            } else {
                 console.log("No previous modal closure recorded. Timer will start.");
            }

            timerId = setTimeout(() => {
                
                 const currentStoredTimestamp = localStorage.getItem(STORAGE_KEY);
                 const currentCheckTime = Date.now();

                 if (currentStoredTimestamp) {
                      const currentLastClosedTime = parseInt(currentStoredTimestamp, 10);
                      if (currentCheckTime - currentLastClosedTime < DURATION_24_HOURS_MS) {
                          console.log("Modal recently closed in another tab, aborting show.");
                          return; 
                      }
                 }

                setBook(true);
                console.log("15 seconds passed, showing modal.");

            }, 15000); 
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
                        <Modal.Header closeButton></Modal.Header>
						<Modal.Body>
							<div className="orange_circle">
								<Image src={OrangeCircle} alt="orangecircle" quality={100} />
							</div>
							<div className="current_img">
								<Image src={Current} alt="Current" quality={100} />
							</div>
							<div className="caption">
								<h3 className="mb-3 popup-head">Book Consultation</h3>
								<p>Want to Starting a New project? Be the earliest one to get a meeting with our experts & get the right advice for your need.</p>
							</div>
							<div className="button_box">
								<Button variant="secondary" onClick={handleBookClose}>
									Let's talk
								</Button>
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