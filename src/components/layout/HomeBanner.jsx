import Image from "next/image";
import Banner from "@/../public/images/banner-bg.webp";
import mobileBanner from "@/../public/images/banner-bg-mobile.webp";
import starBadge from "@/../public/images/vector_star.svg";
import Link from "next/link";

const HomeBanner = () => {
	return (
		<>
			<div className="banner">
				<div className="banner_bg_img">
					<Image src={Banner} alt="Innovative web and mobile app interfaces - Comsci Design & Development Agency" quality={100} />
				</div>
				<div className="mobile_banner_img">
					<Image src={mobileBanner} alt="Innovative web and mobile app interfaces - Comsci Design & Development Agency" quality={100} />
				</div>
				<div className="container">
					<div className="banner_textbox" data-scroll data-scroll-speed=".2">
						<div className="banner_badges fadeInUp">
							<div className="star-badge">
								<div className="stars">
									<Image src={starBadge} alt="Star" />
									<Image src={starBadge} alt="Star" />
									<Image src={starBadge} alt="Star" />
									<Image src={starBadge} alt="Star" />
									<Image src={starBadge} alt="Star" />
								</div>
								<span>TRUSTED 5 STAR</span>
							</div>
							<p>Premier Design & Development Partner</p>
						</div>
						<h1 className="fadeInUp">We help business evolve</h1>
							<p class="fadeInUp banner_sub_text">We collaborate with companies worldwide, offering top-notch web design, custom software solutions, mobile apps, and strategic branding to boost your online visibility.</p>
						<div className='fadeInUp learn_btn_2'>
							<Link href="/services">Explore Our Services</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomeBanner;