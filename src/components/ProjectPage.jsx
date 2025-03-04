import { useState, useEffect } from 'react';
import ProjectListSection from "@/components/layout/ProjectListSection";
import ContentBox from "@/components/layout/ContentBox";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch your projects data here (replace with your actual logic)
		const fetchProjectsData = async () => {
			try {
				// If 'projects.json' is a local file:
				const response = await import('../files/projects.json'); 
				return response.default; // Access the default export
			} catch (error) {
				console.error("Error fetching project data:", error);
				return []; // Return an empty array in case of error
			}
		};

		fetchProjectsData().then(projectsData => {
			const sortedProjects = projectsData.sort((a, b) => a.id - b.id);
			setProjects(sortedProjects);
		});


  }, []);

  return (
    <>
      <div className="project">
        <div className="container">
          <div className="project_section">
          <div className="project_title fadeInUp">
              <ContentBox title="Browse our projects for a glimpse into our past work." />
            </div>
            <div className="projectlist_section">
              <div className="row">
                {projects.map((project, index) => (
                  <div key={project.id} className={`col-lg-6 col-md-6 ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <ProjectListSection project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;