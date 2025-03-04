import ContentBox from "@/components/layout/ContentBox";
import Link from 'next/link';

const HomeBlogBox = () => {
	return (
		<>
			<div className="blog_text fadeInUp">
				<ContentBox title="Current news & exciting Insights from COMSCI." />
				<div className='fadeInUp learn_btn_3'>
                          <Link href="/blogs">Explore Our Blogs</Link>
                </div>
			</div>
		</>
	)
}

export default HomeBlogBox;