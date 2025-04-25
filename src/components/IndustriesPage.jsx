import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';


const IndustriesPage = () => {
	const [industries, setIndustries] = useState([]);

	useEffect(() => {
		const fetchIndustriesData = async () => {
			try {
				const response = await import('../files/industries.json');
				return response.default;
			} catch (error) {
				console.error("Error fetching industries data:", error);
				return [];
			}
		};

		fetchIndustriesData().then(industriesData => {
			setIndustries(industriesData);
		});
	}, []);

	return (
		<>
			<div className="industries">
				<div className="indus_wrap">
					<div className="title">Industries We Serve</div>
					<div className="indus_section">
						{industries.map((industry) => (
							<Link href={`/industries/${industry.link}`} className="industries_imgtext">
								<div className="img_box"> {/*This div is crucial for the sliding animation*/}
									<Image
										src={industry.image}
										alt={industry.title}
										quality={100}
										width={1920} //Adjust width if needed
										height={590} //Adjust height if needed
										layout="responsive"
									/>
								</div>
								<div className="textbox">
									<div className="img_text">
										<h5>{industry.title}</h5>
										<p><span>{industry.description}</span></p>
										<div className="btn_box">
											<strong>Learn more about {industry.title}</strong>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default IndustriesPage;