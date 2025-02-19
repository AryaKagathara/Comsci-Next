import Head from "next/head";
import IndustriesPage from "@/components/IndustriesPage";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";

export default function Home() {
  return (
    <>
      <Head>
        <title>Industries</title>
        <meta name="description" content="Comsci - Unlock unparalleled design and development solutions for your business. Partner with us for award-winning services and agile processes. Explore our projects now!" key="desc" />
      </Head>
      <IndustriesPage />
      <ServicesSection />
      <Technologies />
    </>
  )
}