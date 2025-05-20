import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "xv19ihtx",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});
