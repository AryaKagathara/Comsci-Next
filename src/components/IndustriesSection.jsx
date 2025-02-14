import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import Healthcare from '@/../public/images/Healthcare-Small.webp';
import Web3 from '@/../public/images/Web3-Small.webp';
import RealEstate from '@/../public/images/RealEstate-Small.webp';

const IndustriesSection = () => {

	return (
		<>
			<div className="industries">
				<div className="indus_wrap">
					<div className="title">Industries</div>
					<div className="indus_section">
						<Link href="/industriesdetail" className="industries_imgtext">
							<div className="img_box">
								<Image src={Healthcare} alt="industrie1" quality={100}/>
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
								<Image src={Web3} alt="industrie1" quality={100}/>
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
								<Image src={RealEstate} alt="industrie1" quality={100}/>
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
						<div className="btn_wrap_block">
							<PrimaryBtn name="See all" arrow="no" link="/industries" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default IndustriesSection;