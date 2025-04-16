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
							<li><Image src={Winner} alt="Comsci CSSWinner Award" quality={100}/></li>
							<li><Image src={Awwwards} alt="sci Awwwards Honorable Mention" quality={100}/></li>
							<li><Image src={CSSDA} alt="Comsci CSS Design Awards Recognition" quality={100}/></li>
							<li><Image src={StarAgency} alt="Comsci Clutch 5-Star Agency Badge" quality={100}/></li>
							<li><Image src={Professionals} alt="Comsci Top B2B Professional Award" quality={100}/></li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default AwardType;