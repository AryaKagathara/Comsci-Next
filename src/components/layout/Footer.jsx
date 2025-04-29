import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import FtrLogo from '@/../public/images/footer-logo.svg';

const Footer = () => {
	const contactData = require('../../files/contact.json');
	const industriesData = require('../../files/industries.json');
	const servicesData = require('../../files/services.json');

	const currentYear = new Date().getFullYear();

	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="footer_section">
						<div className="title_box">
							<div className="mail_box">
								<h4>Ready to Start Your Project or Discuss Your Vision?</h4>
								<Link target="_blank" href={`mailto:${contactData.email}?subject=REQUEST - Let's get started`}>Get a Quote</Link>
							</div>
							<PrimaryBtn name="Lets talk" arrow="no" target="_blank" link={contactData.calendly} />
						</div>
						<div className="links_section">
							<div className="use_link">
								<ul>
									<li><Link href="/services">Our Services</Link></li>
									<li><Link href="/projects">Case Studies</Link></li>
									<li><Link href="/approach">Approach</Link></li>
									<li><Link href="/about">About us</Link></li>
									<li><Link href="/blogs">Blogs & Articles</Link></li>
									<li><Link href="/jobposition">Job Positions</Link></li>
									<li><Link href="/freebies">Freebies</Link></li>
									<li><Link href="/contact">Contact Us</Link></li>
								</ul>
							</div>
							<div className="social_media">
								<ul>
									{servicesData.services.map((service) => (
										<li key={service.id}>
											<Link href={`/services/${service.link}`}>
												{service.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="social_media industries_block">
								<ul>
									{industriesData.map((industry) => (
										<li key={industry.id}>
											<Link href={`/industries/${industry.link}`}>
												{industry.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
							{/* <div className="social_media soc_block_wrap">

								<ul>
									<li><Link href="/services">United States</Link></li>
									<li><Link href="/projects">Canada</Link></li>
									<li><Link href="/approach">Italy</Link></li>
									<li><Link href="/about">United Kingdom</Link></li>
									<li><Link href="/blogs">Spain</Link></li>
									<li><Link href="/jobposition">France</Link></li>
									<li><Link href="/freebies">Australia</Link></li>
									<li><Link href="/contact">Netherlands</Link></li>
								</ul>
							</div> */}
							<div className="contactbox">
								<ul>
									<li><Link target="_blank" href={contactData.location} aria-label="Locate Comsci Technologies"><span>{contactData.address}</span></Link></li>
									<li><Link href={`tel:${contactData.phone}`} aria-label="Call Comsci Technologies"><span>{contactData.phone}</span></Link></li>
									<li><Link href={`mailto:${contactData.email}?subject=REQUEST - Let's get started`} aria-label="Email Comsci Technologies"><span>{contactData.email}</span></Link></li>
									{contactData.social_media.map((item) => (
										<li key={item.name}>
											<Link href={item.link}>{item.name}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="copyright">
							<p>© {currentYear} COMSCI TECHNOLOGIES LLP - All rights reserved<Link href="/privacy">Privacy Policy</Link></p>
						</div>
						<div className="footer_logo">
							<Image src={FtrLogo} alt="Comsci Technologies Full Footer Logo" quality={100} />
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer;