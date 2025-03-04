import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import StrategyImg1 from '@/../public/images/strategy-img1.svg';
import StrategyImg2 from '@/../public/images/strategy-img2.svg';
import StrategyImg3 from '@/../public/images/strategy-img3.svg';
import StrategyImg4 from '@/../public/images/strategy-img4.svg';
import StrategyImg5 from '@/../public/images/strategy-img5.svg';

gsap.registerPlugin(ScrollTrigger);

const StrategySection = () => {

	useEffect(() => {
		const sections = gsap.utils.toArray(".content_box");

		sections.forEach(elem => {
			var tl = gsap.timeline({
				scrollTrigger: {
					trigger: elem,
					scrub: true,
					start: "top center",
					end: 'bottom top',
					toggleClass: 'highlight',
				},
			});
		});
		gsap.to(".timeline-line .line-fill", {
			height: '100%',
			ease: 'linear',
			scrollTrigger: {
				trigger: ".strategy_section",
				scrub: true,
				start: "top center",
				end: 'bottom center',
			}
		});
	}, []);

	return (
		<>
			<div className="strategy">
				<div className="container">
					<div className="strategy_section">
						<div className="row">
							<div className="col-lg-5">
								<div className="text_section fadeInUp">
									<h3>All things considered from strategy to code</h3>
								</div>
							</div>
							<div className="col-lg-6 offset-lg-1">
								<div className="strategy_step">
									<div className="step_box">
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg1} alt="image" quality={100}/>
											</div>
											<div className="content_box">
												<span>Strategy</span>
												<p>Our process begins with developing a comprehensive strategy that aligns with clients goals through thorough research, ensuring the final product meets their needs and delivers tangible results.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg2} alt="image" quality={100}/>
											</div>
											<div className="content_box">
												<span>Creative</span>
												<p>Our creative team develops a website design that conveys clients unique value proposition and drives results by creating an intuitive and engaging user experience, ensuring every aspect of the design meets their business objectives.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg3} alt="image" quality={100}/>
											</div>
											<div className="content_box">
												<span>Implementation</span>
												<p>Our developers bring the design to life, ensuring the website is fully functional, responsive, and optimised for search engines, conducting thorough testing to meet high-quality requirements.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg4} alt="image" quality={100}/>
											</div>
											<div className="content_box">
												<span>Test</span>
												<p>Quality assurance is paramount to us. Our dedicated testing team rigorously examines every aspect of your project to identify and address any potential issues. Through thorough testing and debugging, we ensure that the final product meets the highest standards.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg5} alt="image" quality={100}/>
											</div>
											<div className="content_box">
												<span>Delivery</span>
												<p>In the final phase, we work closely with clients to ensure satisfaction and provide training and support for website management. We strive to establish long-term relationships to help clients achieve their business objectives, monitoring website performance and providing ongoing optimization for continued results.</p>
											</div>
										</div>
									</div>
									<div className="timeline-line">
										<div className="line-default"></div>
										<div className="line-fill"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default StrategySection;