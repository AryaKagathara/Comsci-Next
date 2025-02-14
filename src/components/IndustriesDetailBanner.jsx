import Image from "next/image";
import IndustrieDetail1 from "@/../public/images/industriedetail-banner.webp";


const IndustrieDetailBanner = () => {

	return (
		<>
			<div className="industrie_detail_banner">
				<div className="detail_img_block">
					<Image src={IndustrieDetail1} alt="IndustrieDetail1" quality={100}/>
				</div>
			</div>
		</>
	)
}

export default IndustrieDetailBanner;