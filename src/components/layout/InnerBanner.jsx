import Image from "next/image";
import InnerImg from "@/../public/images/innerbanner-img.webp";

const InnerBanner = () => {
	return (
		<>
			<div className="innerbanner">
				<div className="banner_img">
					<Image src={InnerImg} alt="banner" quality={100}/>
				</div>
			</div>
		</>
	)
}

export default InnerBanner;