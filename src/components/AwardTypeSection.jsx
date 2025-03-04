import Image from "next/image";
import Winner from "@/../public/images/awards/CSS-Winner.webp";
import Awwwards from "@/../public/images/awards/Awwwards.webp";
import CSSDA from "@/../public/images/awards/CSSDA.webp";
import StarAgency from "@/../public/images/awards/5-Star-Agency.webp";
import Professionals from "@/../public/images/awards/A1-Professional.webp";

const AwardType = () => {
	return (
		<>
			<div className="awardtype">
				<div className="container">
					<div className="type_section">
						<ul>
							<li><Image src={Winner} alt="CSSWinner" quality={100}/></li>
							<li><Image src={Awwwards} alt="Awwwards" quality={100}/></li>
							<li><Image src={CSSDA} alt="CSS Design" quality={100}/></li>
							<li><Image src={StarAgency} alt="StarAgency" quality={100}/></li>
							<li><Image src={Professionals} alt="Professionals" quality={100}/></li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default AwardType;