import Head from "next/head";
import ErrorSection from "@/components/layout/ErrorSection";

function NotFoundPage() {
	return (
		<>
			<Head>
				<title>404</title>
			</Head>
			<ErrorSection />
		</>
	)
}

export default NotFoundPage