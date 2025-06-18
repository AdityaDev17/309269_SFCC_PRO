"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

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
