"use client";

import analytics from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsProvider() {
	const pathname = usePathname();

	// useEffect(() => {
	// 	// Track page view on initial load and route changes
	// 	analytics.page();
	// }, [pathname]);
	useEffect(() => {
		analytics.page({ path: pathname });
	}, [pathname]);

	return null;
}
