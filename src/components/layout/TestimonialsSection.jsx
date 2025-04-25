import Image from "next/image";
import quote from "@/../public/images/quote-img.svg";
import testimonialsData from "../../files/testimonials.json"; // Import local JSON

const TestimonialsSection = () => {
  return (
    <div className="testimonials">
      <div className="container">
        <div className="testimonial_wrap">
          {testimonialsData.map((testimonial, index) => (
            <div className="test_sec" data-scroll data-scroll-speed={testimonial.scrollSpeed} key={index}>
              <div className="testi_wrap">
                <div className="image">
                  <Image src={testimonial.image} alt="quote" quality={100} width={100} height={100} />
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;