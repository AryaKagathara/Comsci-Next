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
									<h3>Our Proven Process: From Strategy to High-Performance Code</h3>
								</div>
							</div>
							<div className="col-lg-6 offset-lg-1">
								<div className="strategy_step">
									<div className="step_box">
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg1} alt="Comsci digital strategy planning icon" quality={100}/>
											</div>
											<div className="content_box">
												<span>Strategy</span>
												<p>We kick things off by crafting a detailed strategy that aligns perfectly with our clients' goals. Through in-depth research, we make sure the final product not only meets their needs but also delivers real, measurable results.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg2} alt="Comsci creative UX/UI design icon" quality={100}/>
											</div>
											<div className="content_box">
												<span>Creative Design</span>
												<p>Our talented creative team designs websites that showcase our clients' unique value propositions. We focus on creating an intuitive and engaging user experience, ensuring that every element of the design aligns with their business objectives and drives results.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg3} alt="Comsci agile development process icon" quality={100}/>
											</div>
											<div className="content_box">
												<span>Development & Implementation</span>
												<p>Our developers take the design and bring it to life, making sure the website is fully functional, responsive, and optimized for search engines. We conduct thorough testing to ensure everything meets our high-quality standards.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg4} alt="Comsci QA testing symbol" quality={100}/>
											</div>
											<div className="content_box">
												<span>Quality Assurance Testing</span>
												<p>Quality assurance is a top priority for us. Our dedicated testing team meticulously examines every detail of your project to spot and fix any potential issues. Through comprehensive testing and debugging, we guarantee that the final product meets the highest standards.</p>
											</div>
										</div>
										<div className="image_content">
											<div className="img_box">
												<Image src={StrategyImg5} alt="Comsci project delivery checklist icon" quality={100}/>
											</div>
											<div className="content_box">
												<span>Launch & Delivery</span>
												<p>In the final phase, we collaborate closely with our clients to ensure they are satisfied and provide training and support for managing their website. We aim to build long-lasting relationships that help clients achieve their business goals, continuously monitoring website performance and offering ongoing optimization for sustained results.</p>
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