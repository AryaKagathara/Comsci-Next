// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Video3DAnimation = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const coolVideo = videoRef.current;

//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: coolVideo,
//         start: "top top",
//         end: "bottom top",
//         scrub: .1,
//         markers: true,
// 		pin: true,
//       },
//     });

//     coolVideo.onloadedmetadata = function () {
//       tl.to(coolVideo, { currentTime: coolVideo.duration });
//     };


//     function isTouchDevice() {
//       return (
//         'ontouchstart' in window ||
//         navigator.maxTouchPoints > 0 ||
//         navigator.msMaxTouchPoints > 0
//       );
//     }

//     if (isTouchDevice()) {
//       coolVideo.play();
//       coolVideo.pause();
//     }
//   }, []);

//   return (
//     <>
//       <div className="video_animation">
//         <div className="container">
//           <div className="video_wrap">
//             <video ref={videoRef} className="video" preload='true'>
//               <source
//                 src="https://www.dropbox.com/scl/fi/5ukok76xyai6yucgwmpz2/3d-video.mp4?rlkey=u8v43wgq0x222nfwfaxi0d053&dl=0&raw=1"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Video3DAnimation;
