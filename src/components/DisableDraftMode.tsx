"use client";

import { disableDraftMode } from "@/app/[locale]/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function DisableDraftMode() {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [isEmbedded, setIsEmbedded] = useState(false);

	useEffect(() => {
		// Runs only on client
		if (window !== window.parent || !!window.opener) {
			setIsEmbedded(true);
		}
	}, []);

	if (isEmbedded) {
		return null;
	}

	const disable = () =>
		startTransition(async () => {
			await disableDraftMode();
			router.refresh();
		});

	return (
		<div>
			{pending ? (
				"Disabling draft mode..."
			) : (
				<button type="button" onClick={disable}>
					Disable draft mode
				</button>
			)}
		</div>
	);
}
