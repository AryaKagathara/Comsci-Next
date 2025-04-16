import ContentBox from "@/components/layout/ContentBox";
import Link from 'next/link';

const HomeBlogBox = () => {
	return (
		<>
			<div className="blog_text fadeInUp">
				<ContentBox title="Latest Insights from Comsci's Design & Development Experts" />
				<div className='fadeInUp learn_btn_3'>
                          <Link href="/blogs">Explore Our Blog</Link>
                </div>
			</div>
		</>
	)
}

export default HomeBlogBox;