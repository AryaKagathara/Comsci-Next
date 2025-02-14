import Link from "next/link";
import Image from "next/image";
import blog1 from "@/../public/images/blog-pic1.webp";

const BlogListSection = () => {
	return (
		<>
			<div className="listing_secting">
				<Link href="/blogdetail" className="list_wrap">
					<div className="blog_img">
						<Image src={blog1} alt="blog" quality={100}/>
					</div>
					<div className="blog_content">
						<div className="text">
							<span className="category">News</span>
							<div className="first_dot"></div>
							<p className="date">30.October.2023</p>
							<div className="second_dot"></div>
							<div className="time_section">
								<p className="read">Reading Time: approx.</p>	
								<p className="time">02 min</p>
							</div>
						</div>
						<span className="blog_title">Amelie Diehl becomes a lecturer at the University of Applied Sciences Darmstadt for the subject Online Branding.</span>
						<div className="read_btn">
							<p>Read now</p>
						</div>
					</div>
				</Link>
			</div>
		</>
	)
}

export default BlogListSection;