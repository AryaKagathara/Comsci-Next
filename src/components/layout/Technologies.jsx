import Image from "next/image";
import ContentBox from "@/components/layout/ContentBox";
import { useEffect, useState } from "react";


const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await import('../../files/technologies.json');
        setTechnologies(response.default);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="technologies">
      <div className="container">
        <div className="tech_section" data-scroll data-scroll-speed=".2">
          <div className="text_box fadeInUp">
            <ContentBox
              title="Leveraging Cutting-Edge & Reliable Technologies"
              text="We utilize a curated stack of proven and future-proof technologies, including PHP, Python, JavaScript frameworks, native mobile development tools, and leading CMS/eCommerce platforms like WordPress, Laravel, Webflox, Django and Shopify, ensuring scalable and high-performing digital products."
            />
          </div>
          <div className="technologie_images">
            <div className="row">
              {technologies.map((tech, index) => (
                <div className="col-xl-3 col-6 col-md-6 col-lg-4" key={index}>
                  <div className="images_box">
                    <div className="wrapper_box">
                      <div className="picture">
                        <Image
                          src={tech.image}
                          alt={tech.name}
                          quality={100}
                          width={100} // Adjust width/height as needed
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;