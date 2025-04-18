import Image from "next/image";
import Banner from "@/../public/images/banner-bg.webp";
import mobileBanner from "@/../public/images/banner-bg-mobile.webp";
import starBadge from "@/../public/images/5-star-badge.svg";
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
							<Image src={starBadge} alt="Comsci Design & Development Company - We help business evolve" quality={100} />
							<p>Premier Design & Development Partner</p>
						</div>
						<h1 className="fadeInUp">We help business evolve</h1>
							<p class="fadeInUp banner_sub_text">We partner with businesses worldwide, delivering award-winning web design, custom software design, mobile apps, and strategic branding to elevate your digital presence.</p>
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