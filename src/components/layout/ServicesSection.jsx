import Link from "next/link";
import Image from "next/image";
import cross from "@/../public/images/orange-cross.svg";
import world from "@/../public/images/world-img.webp";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Accordion from 'react-bootstrap/Accordion';
import Logo_Branding from '@/../public/images/service-img1.png';
import UX_UI_Design from '@/../public/images/service-img2.webp';
import Website from '@/../public/images/service-img3.webp';
import AI from '@/../public/images/service-img4.webp';
import Mobile_App from '@/../public/images/service-img5.webp';
import SEO from '@/../public/images/service-img6.webp';
import Video_Editing from '@/../public/images/service-img7.webp';

const ServicesSection = () => {

  return (
    <>
      <div className="services">
        <div className="container">
          <div className="service_heading" data-scroll data-scroll-speed=".2">
            <strong>
              We engineer business solutions that drive measurable results for renowned industry leaders around the&nbsp;
              <div className="globe">
                gl
                <div className="world_img">
                  <Image src={world} alt="world" quality={100}/>
                </div>
                be
              </div>
            </strong>
          </div>
          <div className="service_tabsection">
            <Tab.Container id="tabs_wrapper" defaultActiveKey="logo_design_tab">
              <div className="row">
                <div className="heading">
                  <span>Services</span>
                </div>
                <div className="col-lg-6">
                  <div className="tab_section">
                    <Nav variant="pills">
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="logo_design_tab">
                            Logo Design & Branding
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="ui_ux_design_tab">
                            UX/UI Design
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="mobile_application_tab">
                            Mobile Application
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="seo_tab">
                            SEO
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="custom_web_tab">
                            Custom Web Development
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="video_art_tab">
                            Video & Art Direction
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                      <Nav.Item>
                        <div className="service_wrap">
                          <Nav.Link eventKey="artificial_tab">
                            Artificial Intelligence
                            <span>
                              <Image src={cross} alt="cross-arrow" quality={100}/>
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
                <div className="col-lg-6">
                  <Tab.Content>
                    <Tab.Pane eventKey="logo_design_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={Logo_Branding} alt="Our branding experts craft unique logos and comprehensive brand identities that resonate with your target audience, leaving a lasting impression."/>
                        </div>
                        <span>Our branding experts craft unique logos and comprehensive brand identities that resonate with your target audience, leaving a lasting impression.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">Brand Strategy</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Brand Guidelines</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Logo Ideas</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Typography</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Colors</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Concept Design</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="ui_ux_design_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={UX_UI_Design} alt="Elevate your user experience with our innovative UI/UX team, ensuring a seamless and visually appealing design tailored to your audience and brand."/>
                        </div>
                        <span>Elevate your user experience with our innovative UI/UX team, ensuring a seamless and visually appealing design tailored to your audience and brand.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">User-Centered Design</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Prototyping</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Interaction Design</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Figma</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Photoshop</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Illustrator</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Design Thinking</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Storyboarding</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="mobile_application_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={Mobile_App} alt="From concept to app store, our mobile app development team creates cutting-edge applications that provide a seamless experience on various devices."/>
                        </div>
                        <span>From concept to app store, our mobile app development team creates cutting-edge applications that provide a seamless experience on various devices.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">iOS</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Android</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Cross-Platform</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="seo_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={SEO} alt="Boost your online visibility and reach your target audience with our SEO experts who implement data-driven strategies to optimize your website for search engines."/>
                        </div>
                        <span>Boost your online visibility and reach your target audience with our SEO experts who implement data-driven strategies to optimize your website for search engines.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">Search Engine Optimization</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Keywords Research</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">SEO Audits</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Social Media</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="custom_web_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={Website} alt="Our experienced developers build tailored web solutions using the latest technologies, ensuring a scalable and efficient digital presence for your business."/>
                        </div>
                        <span>Our experienced developers build tailored web solutions using the latest technologies, ensuring a scalable and efficient digital presence for your business.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">Full Stack Development</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">E-commerce Solutions</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">API Integration</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">PHP</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Python</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Node.js</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">React</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">WordPress</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Jira/Trello</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="video_art_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={Video_Editing} alt="Bring your brand to life with captivating visuals and storytelling. Our video and art direction team ensures a compelling narrative through engaging multimedia content"/>
                        </div>
                        <span>Bring your brand to life with captivating visuals and storytelling. Our video and art direction team ensures a compelling narrative through engaging multimedia content.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">Storyboarding</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Video Editing</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Creative Direction</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">SEO Audits</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Social Media</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="artificial_tab">
                      <div className="content_box">
                        <div className="img_wrap">
                          <Image quality={100} src={AI} alt="Harness the power of AI to enhance efficiency and user experience. Our AI solutions leverage cutting-edge technologies to bring intelligence to your applications."/>
                        </div>
                        <span>Harness the power of AI to enhance efficiency and user experience. Our AI solutions leverage cutting-edge technologies to bring intelligence to your applications.</span>
                        <div className="chips">
                          <div className="chip">
                            <Link href="javascript:;">Machine Learning</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Natural Language Processing</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Data Science</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">ChatGPT</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">TensorFlow</Link>
                          </div>
                          <div className="chip">
                            <Link href="javascript:;">Python</Link>
                          </div>
                        </div>
                        <div className="learn_btn">
                          <Link href="/servicesdetail">Explore Our Service</Link>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
          </div>
          <div className="mobile_service_tabsection">
            <div className="heading">
              <span>Services</span>
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Logo Design & Branding</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={Logo_Branding} alt="Our branding experts craft unique logos and comprehensive brand identities that resonate with your target audience, leaving a lasting impression." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">Brand Strategy</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Brand Guidelines</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Logo Ideas</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Typography</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Colors</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Concept Design</Link>
                      </div>
                    </div>
                    <span>Our branding experts craft unique logos and comprehensive brand identities that resonate with your target audience, leaving a lasting impression.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>UI/UX Design</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={UX_UI_Design} alt="Elevate your user experience with our innovative UI/UX team, ensuring a seamless and visually appealing design tailored to your audience and brand." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">User-Centered Design</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Prototyping</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Interaction Design</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Figma</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Photoshop</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Illustrator</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Design Thinking</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Storyboarding</Link>
                      </div>
                    </div>
                    <span>Elevate your user experience with our innovative UI/UX team, ensuring a seamless and visually appealing design tailored to your audience and brand.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Mobile Application</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={Mobile_App} alt="From concept to app store, our mobile app development team creates cutting-edge applications that provide a seamless experience on various devices." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">iOS</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Android</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Cross-Platform</Link>
                      </div>
                    </div>
                    <span>From concept to app store, our mobile app development team creates cutting-edge applications that provide a seamless experience on various devices.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>SEO</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={SEO} alt="Boost your online visibility and reach your target audience with our SEO experts who implement data-driven strategies to optimize your website for search engines." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">Search Engine Optimization</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Keywords Research</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">SEO Audits</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Social Media</Link>
                      </div>
                    </div>
                    <span>Boost your online visibility and reach your target audience with our SEO experts who implement data-driven strategies to optimize your website for search engines.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Custom Web Development</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={Website} alt="Our experienced developers build tailored web solutions using the latest technologies, ensuring a scalable and efficient digital presence for your business." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">Full Stack Development</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">E-commerce Solutions</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">API Integration</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">PHP</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Python</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Node.js</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">React</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">WordPress</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Jira/Trello</Link>
                      </div>
                    </div>
                    <span>Our experienced developers build tailored web solutions using the latest technologies, ensuring a scalable and efficient digital presence for your business.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Video & Art Direction</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={Video_Editing} alt="Bring your brand to life with captivating visuals and storytelling. Our video and art direction team ensures a compelling narrative through engaging multimedia content." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">Storyboarding</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Video Editing</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Creative Direction</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">SEO Audits</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Social Media</Link>
                      </div>
                    </div>
                    <span>Bring your brand to life with captivating visuals and storytelling. Our video and art direction team ensures a compelling narrative through engaging multimedia content.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Artificial Intelligence</Accordion.Header>
                <Accordion.Body>
                  <div className="content_box">
                    <div className="image_wrap">
                      <Image quality={100} src={AI} alt="Harness the power of AI to enhance efficiency and user experience. Our AI solutions leverage cutting-edge technologies to bring intelligence to your applications." />
                    </div>
                    <div className="chips">
                      <div className="chip">
                        <Link href="javascript:;">Machine Learning</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Natural Language Processing</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Data Science</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">ChatGPT</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">TensorFlow</Link>
                      </div>
                      <div className="chip">
                        <Link href="javascript:;">Python</Link>
                      </div>
                    </div>
                    <span>Harness the power of AI to enhance efficiency and user experience. Our AI solutions leverage cutting-edge technologies to bring intelligence to your applications.</span>
                    <div className="learn_btn">
                      <Link href="/servicesdetail">Explore Our Service</Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="service_detail">
          <div className="marquee">
            <ul className="marquee-content scroll">
              <li className="back_wrapper">
                <p className="text_box">Best MVP Developers</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">Official WordPress Partner</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">21th Century Best Design</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">5 Star Rated Agency</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">Agile Process</p>
              </li>
              <li className="dot"></li>
            </ul>
            <ul className="marquee-content scroll">
              <li className="back_wrapper">
                <p className="text_box">Award Winning</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">Official WordPress Partner</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">21th Century Best Design</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">5 Star Rated Agency</p>
              </li>
              <li className="dot"></li>
              <li className="back_wrapper">
                <p className="text_box">Agile Process</p>
              </li>
              <li className="dot"></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesSection;