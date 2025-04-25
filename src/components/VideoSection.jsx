import React from 'react';
import { Player } from 'video-react';

const VideoSection = () => {
	return (
		<>
			<div className="video_wrapper">
				<div>
					<div className="video_player">
						<Player>
							<source src="https://joinrebelution.com/wp-content/uploads/2023/04/Rebelution-Intro_compressed.mp4" />
						</Player>
					</div>
				</div>
			</div>
		</>
	)
}

export default VideoSection;