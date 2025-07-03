import { getLandingPageData } from "@/sanity/queries/landing";
import LandingPageMapper from "../../../sanity/mappers/LandingPageMapper";

export default async function LandingPage({ params }) {
	const { slug } = params;
	const landingPageData = await getLandingPageData(slug);

	if (!landingPageData) return <div>Page Not Found</div>;
	console.log("Landing Page Data: ", landingPageData);

	return (
		<div>
			<h1>{landingPageData.title}</h1>
			<LandingPageMapper sections={landingPageData.content} />
		</div>
	);
}
