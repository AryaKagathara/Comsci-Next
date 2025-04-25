import Image from "next/image";
import homepage from "@/../public/images/homepagemacbookimage.webp";

const HomeSiteImage = () => {
	return (
		<>
			<div className="homapage_img">
				<div className="imagebox">
					<Image src={homepage} alt="homepage" quality={100}/>
				</div>
			</div>
		</>
	)
}

export default HomeSiteImage;