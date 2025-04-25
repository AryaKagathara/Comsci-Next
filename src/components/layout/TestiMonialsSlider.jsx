import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonialimg from "@/../public/images/testimonials_sliderimg.svg";
import testimonialsData from "../../files/testimonials.json";

const TestiMonialsSlider = () => {
  const ArrowLeft = (props) => (
    <button {...props} className="left" aria-label="left">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="arrow-left">
          <path id="Shape" d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </button>
  );

  const ArrowRight = (props) => (
    <button {...props} className="right" aria-label="right">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="arrow-right">
          <path id="Shape" d="M14 5L21 12M21 12L14 19M21 12L3 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </button>
  );

  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  return (
    <div className="testimonials_slider">
      <div className="container">
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div className="testimg-text" key={index}>
              <div className="textimgbox">
                <Image src={testimonial.image} alt="Test" quality={100} width={100} height={100} />
              </div>
              <div className="contentbox">
                <h4>{testimonial.quote}</h4>
                <div className="profile_box">
                  <div className="caption">
                    <p>{testimonial.name}</p>
                    <span>{testimonial.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestiMonialsSlider;