import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import FtrLogo from '@/../public/images/footer-logo.svg';

const Footer = () => {
	const contactData = require('../../files/contact.json');
	const industriesData = require('../../files/industries.json');
	const servicesData = require('../../files/services.json');
	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="footer_section">
						<div className="title_box">
							<div className="mail_box">
								<h4>Start a new project or Schedule a Consultation today</h4>
								<Link target="_blank" href={contactData.contact_form}>Get a Quote</Link>
							</div>
							<PrimaryBtn name="Lets talk" arrow="no" link={contactData.contact_form}/>
						</div>
						<div className="links_section">
							<div className="use_link">
								<ul>
									<li><Link href="/services">Services</Link></li>
									<li><Link href="/projects">Projects</Link></li>
									<li><Link href="/approach">Approach</Link></li>
									<li><Link href="/about">About us</Link></li>
									<li><Link href="/blogs">Blogs</Link></li>
									<li><Link href="/jobposition">Job Position</Link></li>
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
							<div className="social_media soc_block_wrap">
								<ul>
								{contactData.social_media.map((item) => (
									<li key={item.name}>
										<Link href={item.link}>{item.name}</Link>
									</li>
								))}
								</ul>
							</div>
							<div className="contactbox">
								<ul>
									<li><p></p></li>
									<li><Link target="_blank" href={contactData.location}><span>{contactData.address}</span></Link></li>
									<li><Link href={`tel:${contactData.phone}`}><span>{contactData.phone}</span></Link></li>
									<li><Link href={`mailto:${contactData.email}?subject=REQUEST - I want to start a new project with Comsci`}><span>{contactData.email}</span></Link></li>
								</ul>
							</div>
						</div>
						<div className="copyright">
							<p>© 2023 COMSCI TECHNOLOGIES All rights reserved<Link href="/privacy">Privacy Policy</Link></p>
						</div>
						<div className="footer_logo">
							<Image src={FtrLogo} alt="ftrlogo" quality={100}/>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer;