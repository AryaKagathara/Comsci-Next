import Link from "next/link";
import Image from "next/image";
import cross from "@/../public/images/orange-cross.svg";
import world from "@/../public/images/globe.webp";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import React from "react";


const ServicesSection = ({ isHome }) => {
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('logo-design-branding');
  const [hasError, setHasError] = useState(false);
  const [marqueeItems, setMarqueeItems] = useState([]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await import('../../files/services.json');
        return response.default;
      } catch (error) {
        console.error("Error fetching services data:", error);
        setHasError(true);
        return [];
      }
    };

    fetchServicesData().then(data => {
      setMarqueeItems(data.marquee);
      setServices(isHome ? data.services.slice(0, 3) : data.services);
    });
  }, [isHome]);

  if (hasError) {
    return <p>Error loading services. Please try again later.</p>;
  }

  if (!services || services.length === 0) {
    return <div className="industries"><div className="indus_wrap"><div className="title">Services</div><div className="indus_section"><p>Loading...</p></div></div></div>;
  }
  return (
    <>
      <div className="services">
        <div className="container">
          <div className="service_heading" data-scroll data-scroll-speed=".2">
            <strong>
            We engineer bespoke digital solutions from <span className="primary-text">web design to robust AI software</span> driving measurable results for industry leaders 
              <div className="globe">
                w
                <div className="world_img">
                  <Image src={world} alt="world" />
                </div>
                rldwide.
              </div>
            </strong>
          </div>
          {/*desktop version*/}
          <div className="service_tabsection d-none d-lg-block">
            <Tab.Container id="tabs_wrapper" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
              <div className="row">
                <div className="heading">
                  <span>Our Core Services</span>
                </div>
                <div className="col-lg-6">
                  <div className="tab_section">
                    <Nav variant="pills" className="flex-column">
                      {services.map((service) => (
                        <Nav.Item key={service.id}>
                          <div className="service_wrap">
                            <Nav.Link eventKey={service.link}>
                              {service.title}
                              <span>
                                <Image src={cross} alt="cross-arrow" quality={100} />
                              </span>
                            </Nav.Link>
                          </div>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </div>
                <div className="col-lg-6">
                  <Tab.Content>
                    {services.map((service, index) => (
                      <Tab.Pane key={service.link} eventKey={service.link}>
                        <div className="content_box">
                          <div className="img_wrap">
                            <Image
                              quality={100}
                              src={service.image}
                              alt={service.alt}
                              width={1000} height={1000}
                            />
                          </div>
                          <span>{service.shortDescription}</span>
                          <div className="learn_btn">
                            <Link href={`/services/${service.link}`}>{service.button_text}</Link>
                          </div>
                        </div>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
          </div>
          {/*mobile version*/}
          <div className="mobile_service_tabsection d-lg-none">
            <div className="heading">
              <span>Services</span>
            </div>
            <Accordion defaultActiveKey="0">
              {services.map((service, index) => (
                <Accordion.Item eventKey={index} key={service.id}> {/* Use service.id as key */}
                  <Accordion.Header>{service.title}</Accordion.Header>
                  <Accordion.Body>
                    <div className="content_box">
                      <div className="image_wrap">
                        <Image src={service.image} alt={service.alt} width={1000} height={1000} />
                      </div>
                      <span>{service.shortDescription}</span>
                      <div className="learn_btn">
                        <Link href={`/services/${service.link}`}>{service.button_text}</Link>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          {isHome && (
            <div className="btn_wrap_block">
              <PrimaryBtn name="See all" arrow="no" link="/services" />
            </div>
          )}

        </div>
        <div className="service_detail">
          <div className="marquee">
            <ul className="marquee-content scroll">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="back_wrapper">
                    <p className="text_box">{item}</p>
                  </li>
                  {index < marqueeItems.length - 1 && <li className="dot"></li>}
                </React.Fragment>
              ))}
            </ul>
            {/* Duplicate the list to create a seamless loop */}
            <ul className="marquee-content scroll">
              {marqueeItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="back_wrapper">
                    <p className="text_box">{item}</p>
                  </li>
                  {index < marqueeItems.length - 1 && <li className="dot"></li>}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesSection;