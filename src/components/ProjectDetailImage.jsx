import Image from "next/image";


const ProjectDetailImage = ({ project }) => {
    // Assuming 'images' is an array of image paths in your project.json
    return (
        <div className="project_imagewrap">
            {project.images && project.images.map((image, index) => (
                <div key={index} className="images_wrapper_block">
                    <Image src={image} alt={project.title+". "+project.description} width={1000} height={1000} quality={100}/>
                </div>
            ))}
        </div>
    );
};


export default ProjectDetailImage;