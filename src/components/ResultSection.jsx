import ContentBox from "@/components/layout/ContentBox";

const ResultSection = () => {
	return (
		<>
			<div className="result">
				<div className="container">
					<div className="result_wrap">
						<div className="result_content">
							<ContentBox title="Our results in numbers" />
						</div>
						<div className="result_detail">
							<div className="result_textbox">
								<h4>95%</h4>
								<span>Customer satisfaction</span>
							</div>
							<div className="result_textbox">
								<h4>50+</h4>
								<span>Completed Projects</span>
							</div>
							<div className="result_textbox">
								<h4>40+</h4>
								<span>Team members</span>
							</div>
							<div className="result_textbox">
								<h4>2022</h4>
								<span>Starting Year</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
	
export default ResultSection;