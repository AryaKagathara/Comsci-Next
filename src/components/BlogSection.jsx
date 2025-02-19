import HomeBlogBox from "@/components/HomeBlogBox";
import BlogListSection from "@/components/layout/BlogListSection";

const BlogSection = () => {
	return (
		<>
			<div className="blog">
				<div className="container">
					<div className="blog_section">
						<HomeBlogBox />
						<div className="bloglist_section">
							<BlogListSection />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BlogSection;