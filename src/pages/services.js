import Head from "next/head";
import ServicesSection from "@/components/layout/ServicesSection";
import Technologies from "@/components/layout/Technologies";

export default function Services() {
  return (
    <>
      <Head>
        <title>SERVICES</title>
      </Head>
      <ServicesSection />
      <Technologies />
    </>
  )
}