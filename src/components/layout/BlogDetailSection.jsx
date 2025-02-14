import Image from "next/image";
import Detailpicture from "@/../public/images/blogdetail-picture.webp";

const BlogDetailSection = () => {
	return (
		<>
			<div className="blogdetail">
				<div className="container">
					<div className="blogdetail_section">
						<span>Amelie Diehl becomes a lecturer at the University of Applied Sciences Darmstadt for the subject Online Branding.</span>
						<div className="caption">
							<i>News</i>
							<div className="dot"></div>
							<i>October  30 ,2023</i>
						</div>
						<div className="image">
							<Image src={Detailpicture} alt="Detailpicture" quality={100}/>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin nisl eu augue fermentum gravida. Etiam vestibulum feugiat congue. Quisque et sollicitudin est. Integer at iaculis dolor. Phasellus viverra sit amet diam id condimentum. Integer euismod, est quis dignissim venenatis, ipsum enim hendrerit justo, a pretium ligula velit quis velit.Sed at lorem nec elit bibendum pretium nec sed quam.</p>
						<p>Sed tristique nisl vel gravida tempor. Sed non lectus eget quam ornare placerat faucibus eu diam. Phasellus eleifend, lectus et euismod dignissim, mi tellus porta quam, ac porttitor orci felis et urna. Vestibulum fermentum nulla ac nisi tempus lobortis. Quisque dolor purus, maximus id tellus pharetra, ornare lobortis ligula. In hac habitasse platea dictumst Ut ullamcorper nulla eget metus sagittis, eu convallis erat semper. Nunc iaculis, justo non iaculis euismod, dolor purus pharetra arcu, non facilisis velit eros sit amet elit. Quisque nec purus dolor. Nulla vitae sem in massa aliquam feugiat.</p>
						<p>Aliquam sit amet dignissim odio.Curabitur mattis ipsum faucibus tortor gravida, sed imperdiet orci imperdiet. Donec quis semper neque, eget blandit risus. Nunc lacinia dolor in risus tempus consectetur. Mauris sit amet sodales leo, et rutrum erat. Praesent ut ex eget mauris bibendum dapibus. In ut dui egestas, luctus mauris a, suscipit dolor. Maecenas elementum ligula nec sollicitudin ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris lobortis nibh sit amet purus pretium, quis aliquet ipsum bibendum.</p>
						<p>Morbi commodo tempor pellentesque. Sed in arcu pellentesque, suscipit nulla quis, vestibulum elit. Nullam eget placerat orci. Aenean cursus dolor rutrum massa cursus, sed porta justo bibendum. Etiam nulla odio, dignissim id varius at, blandit ut ex. Donec suscipit tortor lorem, faucibus cursus tellus pretium a. Nunc pharetra venenatis odio, ac accumsan lacus semper sit amet. Suspendisse quis nisl scelerisque, commodo felis maximus, placerat ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas a elementum sapien. Maecenas cursus imperdiet est. Duis feugiat sagittis leo.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin nisl eu augue fermentum gravida. Etiam vestibulum feugiat congue. Quisque et sollicitudin est. Integer at iaculis dolor. Phasellus viverra sit amet diam id condimentum. Integer euismod, est quis dignissim venenatis, ipsum enim hendrerit justo, a pretium ligula velit quis velit.Sed at lorem nec elit bibendum pretium nec sed quam.</p>
						<p>Sed tristique nisl vel gravida tempor. Sed non lectus eget quam ornare placerat faucibus eu diam. Phasellus eleifend, lectus et euismod dignissim, mi tellus porta quam, ac porttitor orci felis et urna. Vestibulum fermentum nulla ac nisi tempus lobortis. Quisque dolor purus, maximus id tellus pharetra, ornare lobortis ligula. In hac habitasse platea dictumst Ut ullamcorper nulla eget metus sagittis, eu convallis erat semper. Nunc iaculis, justo non iaculis euismod, dolor purus pharetra arcu, non facilisis velit eros sit amet elit. Quisque nec purus dolor. Nulla vitae sem in massa aliquam feugiat.</p>
						<p>Aliquam sit amet dignissim odio.Curabitur mattis ipsum faucibus tortor gravida, sed imperdiet orci imperdiet. Donec quis semper neque, eget blandit risus. Nunc lacinia dolor in risus tempus consectetur. Mauris sit amet sodales leo, et rutrum erat. Praesent ut ex eget mauris bibendum dapibus. In ut dui egestas, luctus mauris a, suscipit dolor. Maecenas elementum ligula nec sollicitudin ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris lobortis nibh sit amet purus pretium, quis aliquet ipsum bibendum.</p>
						<p>Morbi commodo tempor pellentesque. Sed in arcu pellentesque, suscipit nulla quis, vestibulum elit. Nullam eget placerat orci. Aenean cursus dolor rutrum massa cursus, sed porta justo bibendum. Etiam nulla odio, dignissim id varius at, blandit ut ex. Donec suscipit tortor lorem, faucibus cursus tellus pretium a. Nunc pharetra venenatis odio, ac accumsan lacus semper sit amet. Suspendisse quis nisl scelerisque, commodo felis maximus, placerat ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas a elementum sapien. Maecenas cursus imperdiet est. Duis feugiat sagittis leo.</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default BlogDetailSection;