import Link from "next/link";
import Image from "next/image";
import Share from "@/../public/images/share.svg";
import Export from "@/../public/images/export.svg";

const ProjectDetailContent = ({ project }) => {
    return (
        <div className="project_detail_section">
            <div className="container">
                <div className="detail_wrap">
                    <h5>{project.title}</h5>
                    {/* Assuming 'description' can contain HTML */}
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                    <ul className="share_btn">
                       <li><Link href="#"><Image src={Share} alt="share" quality={100}/></Link></li>
                       <li><Link href="#"><Image src={Export} alt="export" quality={100}/></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailContent;