import Head from "next/head";
import Faqsection from "@/components/layout/Faqsection";
// import ModalSection from "@/components/layout/ModalSection";

export default function Faqs() {
  return (
    <>
      <Head>
        <title>FAQ</title>
      </Head>
	    <Faqsection />
      {/* <ModalSection /> */}
    </>
  )
}