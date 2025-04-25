import Image from 'next/image';

const ProjectDetailBanner = ({ project }) => {

    if (!project) {
        return null;
    }

    return (
        <div className="project_imagewrap">
            {project.image && (
                 <div className="images_wrapper_block_top">
                    <Image
                        src={project.image}
                        alt={project.alt || `${project.title} showcase image`}
                        width={1000} 
                        height={1000}
                        quality={100}
                    />
                 </div>
            )}
             {!project.image && (
                 <div className="no_image_placeholder">
                     No main image available for this project.
                 </div>
             )}
        </div>
    );
}

export default ProjectDetailBanner;