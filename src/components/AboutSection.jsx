import ContentBox from "@/components/layout/ContentBox";

const aboutData = require('../files/about.json'); // Load data using require

const AboutSection = () => {
  return (
    <div className="aboutus">
      <div className="container">
        <div className="about_section">
          <div className="titlebox">
            <span>{aboutData.title}</span>
            <ContentBox title={aboutData.missionStatement} />
          </div>
          <div className="aboutstep_box">
            {aboutData.steps.map((step) => (
              <div className="content_box" key={step.number}>
                <div className="number_box">
                  <p>{step.number}</p>
                </div>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;