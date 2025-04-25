import Link from "next/link";

const PrimaryBtn = (props) => {
	return (
		<>
			<div className={`contact_btn ${props.isFadeInUp ? 'fadeInUp' : ''}`}>
				<Link href={ props.link }>
					<span>
						{ props.name }
						{ props.arrow == 'yes' ? 
						<i>
							<svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.20361 2.441V0.78125H16.502V11.0717H14.8224V3.61389L1.67322 16.7813L0.501953 15.6084L13.6511 2.441H6.20361Z" fill="white"/>
							</svg>
						</i> : '' }
					</span>
				</Link>
			</div>
		</>
	)
}

export default PrimaryBtn;