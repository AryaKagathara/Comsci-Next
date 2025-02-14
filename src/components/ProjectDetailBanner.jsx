import Image from 'next/image'

const ProjectDetailBanner = ({ project }) => {
    return (
        <section className="inner_banner project_detail_page">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="banner_img">
                            <Image src={project.image} alt={project.title} width={600} height={400} quality={100}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="detail_wrap">
                            <div className="common_title">
                                <h2>{project.title}</h2>
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectDetailBanner