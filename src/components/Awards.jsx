import Image from "next/image";
import Award from "@/../public/images/award-img.webp";
import Award1 from "@/../public/images/award-img1.webp";
import Award2 from "@/../public/images/award-img2.webp";
import Award3 from "@/../public/images/award-img3.webp";
import Award4 from "@/../public/images/award-img3.webp";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {

  const awardElBig = useRef(null);
  const awardEl1 = useRef(null);
  const awardEl2 = useRef(null);
  const awardEl3 = useRef(null);
  const awardEl4 = useRef(null);

  useEffect(() => {

    async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const scroll = new LocomotiveScroll();
    };

    const animateElement = (element, animation) => {
      if (!element) {
        console.error("Element is undefined");
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(element, animation.from, animation.to);
    };

    animateElement(awardElBig.current,{
      from:{
        y: 400 
      },
      to: {
        y: -1500 
      } 
    });
    animateElement(awardEl1.current,{
      from: {
        y: 400 
      },
      to: {
        y: -1500,
        rotation: 360
      }
    });
    animateElement(awardEl2.current,{
      from: {
        y: 400
      },
      to: {
        y: -1500,
        rotation: -360 
      } 
    });
    animateElement(awardEl3.current, {
      from: {
        y: 400
      },
      to: {
        y: -1500,
        rotation: 360 
      } 
    });
    animateElement(awardEl4.current, { 
      from: { 
        y: 400 
      },
      to: { 
        y: -1500,
        rotation: -360 
      } 
    });
  }, []);

  return (
    <>
      <div className="award">
        <div className="container">
          <div className="award_section">
            <div className="image">
              <Image src={Award} alt="Abstract representation of excellence in UX design - Comsci award focus, Comsci design award trophy elements montage" ref={awardElBig} quality={100} />
            </div>
            <div className="first_img">
              <Image src={Award1} alt="Abstract representation of excellence in UX design - Comsci award focus, Comsci design award trophy elements montage" ref={awardEl1} quality={100} />
            </div>
            <div className="second_img">
              <Image src={Award2} alt="Abstract representation of excellence in UX design - Comsci award focus, Comsci design award trophy elements montage" ref={awardEl2} quality={100}/>
            </div>
            <div className="third_img">
              <Image src={Award3} alt="Abstract representation of excellence in UX design - Comsci award focus, Comsci design award trophy elements montage" ref={awardEl3} quality={100}/>
            </div>
            <div className="fourth_img">
              <Image src={Award4} alt="Abstract representation of excellence in UX design - Comsci award focus, Comsci design award trophy elements montage" ref={awardEl4} quality={100}/>
            </div>
            <div className="award_text">
              <h2>Recognized Excellence in Design & User Experience</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Awards;
