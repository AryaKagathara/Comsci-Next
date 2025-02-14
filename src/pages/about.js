import Head from "next/head";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ResultSection from "@/components/ResultSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import TestiMonialsSlider from "@/components/layout/TestiMonialsSlider";
import Awards from "@/components/Awards";
import RendomLogo from "@/components/RendomLogo";

export default function About() {
  return (
    <>
      <Head>
        <title>ABOUT US</title>
      </Head>
      <AboutSection />
      <Awards />
      <RendomLogo />
      {/* <TeamSection /> */}
      <ResultSection />
      <TestimonialsSection />
      <TestiMonialsSlider />
    </>
  )
}