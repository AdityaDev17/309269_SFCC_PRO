// src/app/api/draft-mode/enable/route.ts

import { sanityClient } from "@/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});