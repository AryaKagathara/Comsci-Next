import PrimaryBtn from '@/components/layout/PrimaryBtn';
import ContentBox from "@/components/layout/ContentBox";

const HomeProjectBox = () => {
	
	return (
		<>
			<div className="project_text fadeInUp">
				<ContentBox title="Browse our projects for a glimpse into our past work." />
				<PrimaryBtn name="View more" arrow="no" link="/projects" />
			</div>
		</>
	)
}

export default HomeProjectBox;