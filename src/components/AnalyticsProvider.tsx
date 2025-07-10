"use client";

import analytics from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsProvider() {
	const pathname = usePathname();
	useEffect(() => {
		analytics.page({ path: pathname });
	}, [pathname]);

	return null;
}
