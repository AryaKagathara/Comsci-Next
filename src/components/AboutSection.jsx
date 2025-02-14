import ContentBox from "@/components/layout/ContentBox";

const AboutSection = () => {
	return (
		<>
			<div className="aboutus">
				<div className="container">
					<div className="about_section">
						<div className="titlebox">
							<span>Our Mission</span>
							<ContentBox title="Unleashing the potential of the digital realm, our agency is dedicated to pioneering transformation through inventive solutions." />
						</div>
						<div className="aboutstep_box">
							<div className="content_box">
								<div className="number_box">
									<p>01.</p>
								</div>
								<span>We are dedicated to providing exceptional results for our clients. Mediocrity is not an option; we uphold a commitment to excellence, mitigating risks and ensuring shared responsibility. Our strategic imperative is to cultivate and retain expertise in-house.</span>
							</div>
							<div className="content_box">
								<div className="number_box">
									<p>02.</p>
								</div>
								<span>Our belief in the power of personal relationships fuels the success of each project. With a personalized approach, every team member is actively involved beyond development, ensuring a collaborative and customer-centric focus.</span>
							</div>
							<div className="content_box">
								<div className="number_box">
									<p>03.</p>
								</div>
								<span>The driving force behind our team is the impact we aim to make. Rooted in purpose, our work is not just about what we do but why we do it. Our agency consistently aligns its efforts with a clear understanding of the impact our solutions will have.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AboutSection;