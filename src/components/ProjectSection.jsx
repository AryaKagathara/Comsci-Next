import HomeProjectBox from "@/components/HomeProjectBox";
import ProjectListSection from "@/components/layout/ProjectListSection";
import PrimaryBtn from '@/components/layout/PrimaryBtn';
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


const ProjectSection = () => {
    const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Fetch your projects data here (replace with your actual logic)
		const fetchProjectsData = async () => {
			try {
				// Assuming 'projects.json' is a local file in the same directory
				const response = await import('../files/projects.json'); 
				return response.default; // Access default export
			} catch (error) {
				console.error("Error fetching project data:", error);
				return []; // Return empty array to avoid errors
			}
		};

		fetchProjectsData().then(projectsData => {
			// Sort projects by ID in ascending order
			const sortedProjects = projectsData.sort((a, b) => a.id - b.id);
			setProjects(sortedProjects);
		});


		// GSAP animations
		gsap.set(".fadeInUp", { y: "30%", opacity: 0 });
		ScrollTrigger.batch(".fadeInUp", {
			onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.5, stagger: 0.2, y: 0 }),
		});


	}, []);

  return (
      <div className="project">
        <div className="container">
          <div className="project_section">
              <HomeProjectBox /> 
            <div className="projectlist_section">
              <div className="row">
                  {projects.slice(0, 4).map((project, index) => ( 
                    <div key={project.id} className={`col-lg-6 col-md-6 ${index % 2 === 0 ? 'even' : 'odd'}`}>
                        <ProjectListSection project={project} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="projectbtn_wrap">
                  <PrimaryBtn name="View more" arrow="no" link="/projects" />
              </div>
          </div>
        </div>
      </div>
  );
};

export default ProjectSection;