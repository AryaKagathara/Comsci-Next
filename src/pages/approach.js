import Head from "next/head";
import ServicesSection from "@/components/layout/ServicesSection";
import StrategySection from "@/components/layout/StrategySection";
import Technologies from "@/components/layout/Technologies";
import ProjectSection from "@/components/ProjectSection";

export default function Approach() {
  return (
    <>
      <Head>
        <title>APPROACH</title>
      </Head>
      <StrategySection />
      <ProjectSection />
      <ServicesSection />
      <Technologies />
    </>
  )
}