// src/app/api/draft-mode/enable/route.ts
export const runtime = "edge";

import { sanityClient } from "@/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});