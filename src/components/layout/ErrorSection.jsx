import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import { useEffect } from 'react';

const ErrorSection = () => {

	useEffect(() => {
		const eyeball = (event) => {
			const eyes = document.querySelectorAll('.eyes');
			const eyeball = document.querySelectorAll('.eyeball');
		
			let posX = event.clientX - screen.width;
  			let posY = event.clientY - screen.height;

			eyeball.forEach((eye) => {
				eye.style.transform = "translate("+posX*0.1+"%, "+posY*0.1+"%)"
			});
		};
	
		document.querySelector('body').addEventListener('mousemove', eyeball);
	
		return () => {
		  	document.querySelector('body').removeEventListener('mousemove', eyeball);
		};
	}, []);

	return (
		<>
			<div className="error">
				<div className="error_section">
					<div className="maze_wrap">
						<div className="eyebrow"></div>
						<div className="eye_box">
							<div className="eyes">
							<div className="eyeball"></div>
							</div>
							<div className="eyes">
							<div className="eyeball" ></div>
							</div>
						</div>
					</div>
					<div className="maze_content fadeInUp">
						<h4>Looks like you are in a maze.</h4>
						<p>The page you’re looking for is not available</p>
						<div className="maze_btn">
							<PrimaryBtn name="Go back Home" arrow="no" link="/"/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default ErrorSection;