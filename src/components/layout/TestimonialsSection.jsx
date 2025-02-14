import Image from "next/image";
import quote from "@/../public/images/quote-img.svg";

const TestimonialsSection = () => {
	return (
		<>
			<div className="testimonials">
				<div className="container">
					<div className="testimonial_wrap">
						<div className="test_sec" data-scroll data-scroll-speed=".2">
							<div className="testi_wrap">
								<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>I can’t believe that something is so well done.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Samhita B</p>
											<span>Founder & CEO, Multia</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="test_sec" data-scroll data-scroll-speed=".4">
							<div className="testi_wrap">
							<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>It was great pleasure working on the project. Happy to work on future projects. Highly recommending.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Martin B</p>
											<span>Founder & CEO, Mipo</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="test_sec" data-scroll data-scroll-speed=".4">
							<div className="testi_wrap">
							<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>The quality of the work has been great.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Joaquin M</p>
											<span>Technical Director, Coslett</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="test_sec" data-scroll data-scroll-speed=".4">
							<div className="testi_wrap">
							<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>Yes am happy. It worth to paid up to date for the hard work.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Josh B</p>
											<span>CEO, GDF</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="test_sec" data-scroll data-scroll-speed=".4">
							<div className="testi_wrap">
							<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>You guys are truly understanding the pain points which I care about alot.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Quentin D</p>
											<span>Owner, BLKResumes</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="test_sec" data-scroll data-scroll-speed=".4">
							<div className="testi_wrap">
							<div className="image">
									<Image src={quote} alt="quote" quality={100}/>
								</div>
								<div className="contentbox">
									<h4>From the first day till the end. It was a perfect execution by the team on the website.</h4>
									<div className="profile_box">
										<div className="caption">
											<p>Steffano S</p>
											<span>Owner, Scozzese Agency</span>
										</div>
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

export default TestimonialsSection;