import Head from 'next/head';
import ProjectDetailBanner from '@/components/ProjectDetailBanner';
import ProjectDetailContent from '@/components/ProjectDetailContent';
import ProjectDetailImage from '@/components/ProjectDetailImage';


export async function getStaticPaths() {
  const projects = require('../../files/projects.json');
  const paths = projects.map(project => ({
      params: { id: project.link }, // Use the link directly
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const projects = require('../../files/projects.json');

  const project = projects.find(project => project.link === params.id); // Remove replace

  if (!project) {
    return {
      notFound: true,
    }
  }


  return{
  	props: { project }
  }
}

export default function ProjectDetail({project}) {
    if(!project){
        return <div>Project Not Found</div>
    }

  return (
    <>
      <Head>
        <title>{project.title}</title>
          <meta name="description" content={project.description} />        
      </Head>
      <ProjectDetailImage project={project} />
    </>
  );
}