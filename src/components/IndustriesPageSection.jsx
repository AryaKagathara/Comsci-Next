import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import Healthcare_Small from '@/../public/images/Healthcare-Small.webp';
import Web3_Small from '@/../public/images/Web3-Small.webp';
import RealEstate_Small from '@/../public/images/RealEstate-Small.webp';
import Hospitality_Small from '@/../public/images/Hospitality-Small.webp';
import Educational_Small from '@/../public/images/Educational-Small.webp';
import Entertainment_Small from '@/../public/images/Entertainment-Small.webp';
import Ecommerce_Small from '@/../public/images/Ecommerce-Small.webp';
import Fintech_Small from '@/../public/images/Fintech-Small.webp';

const IndustriesSection = () => {

	return (
		<>
			<div className="industries industrie_wrapper">
				<div className="indus_wrap">
					<div className="title">Industries</div>
					<div className="indus_section">
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Healthcare_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Healthcare</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Heathcare</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Web3_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Web3</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Web3</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={RealEstate_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Real Estate</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Real Estate</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Educational_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Educational</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Educational</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Hospitality_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Hospitality & Luxery</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Real Estate</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Entertainment_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Entertainment and Media</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Real Estate</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Ecommerce_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Ecommerce & Retail</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Real Estate</strong>
									</div>
								</div>
							</div>
						</Link>
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Fintech_Small} alt="industrie1" quality={100}/>
							</div>
							<div className="textbox">
								<div className="img_text">
									<h5>Finance & Banking Tech</h5>
									<p><span>Ever wonder why tapping that cute little box icon on your mobile app.</span></p>
									<div className="btn_box">
										<strong>Learn more about Real Estate</strong>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default IndustriesSection;