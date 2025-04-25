import PrimaryBtn from '@/components/layout/PrimaryBtn';
import Link from 'next/link';

const ProjectDetailContent = ({ project }) => {

    if (!project) {
        return <div>Project details not available.</div>;
    }

    return (
        <div className="project_detail_section bg-white">
            <div className="container">
                <div className="detail_wrap text-black">
                    <h1>{project.title}</h1>
                    <div className="project_long_content my-5">
                        {project.content && Array.isArray(project.content) && project.content.length > 0 ? (
                            
                            project.content.map((block, index) => {
                                
                                if (block.tag === 'p' && block.content) {
                                    return <p key={`content-block-${index}`} dangerouslySetInnerHTML={{ __html: block.content }} />;
                                }
                                
                                return null;
                            })
                        ) : (
                             
                            project.description ? (
                                <div dangerouslySetInnerHTML={{ __html: project.description }} />
                            ) : (
                                
                                <p>No content available for this project.</p>
                            )
                        )}
                    </div>
                    {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="tags-container">
                            {project.technologies.map((tech, index) => (
                                <div className="tag-item" key={index}>
                                    <span className="tag-text">{tech}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {project['external-link'] && (
                        <Link href={project['external-link']} className='general-link'>Visit Project</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailContent;