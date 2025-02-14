import Link from "next/link";
import Image from "next/image";
import Paige from "@/../public/images/paige-image.webp";
import Tristan from "@/../public/images/tristan-image.webp";
import Megan from "@/../public/images/megan-image.webp";
import Laura from "@/../public/images/laura-image.webp";
import Katie from "@/../public/images/katie-image.webp";
import Markus from "@/../public/images/markus-image.webp";
import Emma from "@/../public/images/emma-image.webp";
import Brandon from "@/../public/images/brandon-image.webp";
import ContentBox from "@/components/layout/ContentBox";

const TeamSection = () => {
	return (
		<>
			<div className="team">
				<div className="container">
					<div className="team_section">
						<div className="title">
							<ContentBox title="Our Team" />
						</div>
						<div className="team_list">
							<div className="row">
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Brandon} alt="Brandon" quality={100}/>
										</div>
										<div className="text">
											<p>Brandon Harrar</p>
											<span>Founder + Creative Director</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Emma} alt="Emma" quality={100}/>
										</div>
										<div className="text">
											<p>Emma De Angelis</p>
											<span>Senior Graphic Designer</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Markus} alt="Markus" quality={100}/>
										</div>
										<div className="text">
											<p>Markus Specogna</p>
											<span>Web Developer</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Katie} alt="Katie" quality={100}/>
										</div>
										<div className="text">
											<p>Katie Armstrong</p>
											<span>Account Director</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Laura} alt="Laura" quality={100}/>
										</div>
										<div className="text">
											<p>Brandon Harrar</p>
											<span>Web Developer</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Megan} alt="Megan" quality={100}/>
										</div>
										<div className="text">
											<p>Emma De Angelis</p>
											<span>UI/UX designer</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Tristan} alt="Tristan" quality={100}/>
										</div>
										<div className="text">
											<p>Markus Specogna</p>
											<span>Web Developer</span>
										</div>
									</Link>
								</div>
								<div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
									<Link href="#" className="teambox">
										<div className="image">
											<Image src={Paige} alt="Paige" quality={100}/>
										</div>
										<div className="text">
											<p>Katie Armstrong</p>
											<span>Project Manager</span>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default TeamSection;