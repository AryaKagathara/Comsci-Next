import Head from "next/head";
import InnerBanner from "@/components/layout/InnerBanner";
import Process from "@/components/Process";
import ProjectSection from "@/components/ProjectSection";
import ServicesType from "@/components/ServicesType";

export default function ServicesDetail() {
	return (
	  <>
		<Head>
		  <title>SERVICES DETAIL</title>
		</Head>
		<InnerBanner />
		<Process />
		<ServicesType />
		<ProjectSection />
	  </>
	)
  }