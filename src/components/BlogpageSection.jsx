import Link from "next/link";
import BlogListSection from "@/components/layout/BlogListSection";
import ContentBox from "@/components/layout/ContentBox";
import PrimaryBtn from '@/components/layout/PrimaryBtn';

const BlogpageSection = () => {
	return (
		<>
			<div className="blog">
				<div className="container">
					<div className="blog_section">
						<div className="blogpage_wrapper">
							<ContentBox title="Existing insights and articles" />
						</div>
						{/* <div className="filter_btn">
							<ul>
								<li><Link href="#" className="active">All</Link></li>
								<li><Link href="#">News</Link></li>
								<li><Link href="#">Articles</Link></li>
								<li><Link href="#">Events</Link></li>
							</ul>
						</div> */}
						<div className="bloglist_section">
							<BlogListSection />
						</div>
						{/* <div className="blog_loadbtn">
							<PrimaryBtn name="Load more" arrow="no" link="#"/>
						</div> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default BlogpageSection;