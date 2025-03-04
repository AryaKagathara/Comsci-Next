// components/layout/BlogListSection.js - Updated
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";



const BlogListSection = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const fetchBlogsData = async () => {
			try {
				const response = await import('../../files/blogs.json');
				return response.default;
			} catch (error) {
				console.error("Error fetching Blogs data:", error);
				return [];
			}
		};

		fetchBlogsData().then(blogsData => {
			setBlogs(blogsData);
		});
	}, []);

return (
		<>
		{blogs.map((blog) => (
			<div className="listing_secting">
				<Link href={`/blog/${blog.link}`} className="list_wrap">
					<div className="blog_img">
						<Image src={blog.image} alt="blog" quality={100} width={1000} height={1000}/>
					</div>
					<div className="blog_content">
						<div className="text">
							<span className="category">{blog.author}</span>
							<div className="first_dot"></div>
							<p className="date">{blog.date}</p>
							<div className="second_dot"></div>
							<div className="time_section">
								<p className="read">Reading Time: approx.</p>	
								<p className="time">{blog.readingTime}</p>
							</div>
						</div>
						<h2 className="blog_title">{blog.title}</h2>
						<div className="read_btn">
							<p>Read now</p>
						</div>
					</div>
				</Link>
			</div>
		))}
	</>
)
}

export default BlogListSection;