import Head from "next/head";
import ProjectPage from "@/components/ProjectPage";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";

export default function Projects() {
  return (
    <>
      <Head>
        <title>PROJECTS</title>
      </Head>
      <ProjectPage />
      <TestimonialsSection />
      <TestiMonialsSlider />
    </>
  )
}