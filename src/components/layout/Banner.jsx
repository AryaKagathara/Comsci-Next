import Image from "next/image";
import Banner from "@/../public/images/banner-bg.webp";
import mobileBanner from "@/../public/images/banner-bg-mobile.webp";
import starBadge from "@/../public/images/5-star-badge.svg";
import Link from "next/link";

const HomeBanner = () => {
	return (
		<>
			<div className="banner" data-scroll data-scroll-speed=".6">
				<div className="banner_bg_img">
					<Image src={Banner} alt="Innovative web and mobile app interfaces - Comsci Design & Development Agency" quality={100} />
				</div>
				<div className="mobile_banner_img">
					<Image src={mobileBanner} alt="Innovative web and mobile app interfaces - Comsci Design & Development Agency" quality={100} />
				</div>
				<div className="container">
					<div className="banner_textbox" data-scroll data-scroll-speed=".2">
						<h1 className="fadeInUp home_banner">About Comsci Technologies: Your Partner in Digital Innovation</h1>
						<p class="fadeInUp home_banner">We partner with forward-thinking businesses across Europe, the USA, and globally, transforming visions into impactful digital realities. We specialize in bespoke web design, custom software development, engaging mobile apps, and strategic branding that delivers results.</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomeBanner;