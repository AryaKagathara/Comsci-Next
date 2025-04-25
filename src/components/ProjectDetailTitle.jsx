import Link from "next/link";
import Image from "next/image";
import Share from "@/../public/images/share-img.svg";
import Export from "@/../public/images/export-img.svg";

const ProjectDetailTitle = () => {
	return (
		<>
			<div className="project_titlebox">
				<div className="container">
					<div className="project_titlesection">
						<p className="fadeInUp">2020</p>
						<span className="fadeInUp">BLK RESUME</span>
						<div className="imgbox fadeInUp">
							<Link href="#"><Image src={Share} alt="share" quality={100}/></Link>
							<Link href="#"><Image src={Export} alt="export" quality={100}/></Link>
						</div>
						<i className="fadeInUp">When Comsci came to us, they were well-established from sea to shining sea. But like a lot of brands, they struggled to balance their long history with engaging new, younger clients.</i>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectDetailTitle;