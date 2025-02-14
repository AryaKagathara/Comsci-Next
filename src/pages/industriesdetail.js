import Head from "next/head";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";
import IndustrieDetailBanner from "@/components/IndustriesDetailBanner";
import IndustriesDetailContent from "@/components/IndustriesDetailContent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Industriesdetail</title>
        <meta name="description" content="Comsci - Unlock unparalleled design and development solutions for your business. Partner with us for award-winning services and agile processes. Explore our projects now!" key="desc" />
      </Head>
      <IndustrieDetailBanner />
      <IndustriesDetailContent />
      <ServicesSection />
      <Technologies />
    </>
  )
}