import Image from "next/image";
import InnerImg from "@/../public/images/innerbanner-img.webp";

const InnerBanner = ({banner}) => {

	const bannerImage = banner?.image_full || InnerImg;
	return (
		<>
			<div className="innerbanner">
				<div className="banner_img">
					<Image src={bannerImage} alt="banner" quality={100} width={2000} height={2000}/>
				</div>
			</div>
		</>
	)
}

export default InnerBanner;