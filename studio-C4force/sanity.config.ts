import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { presentationTool } from "sanity/presentation";
import { assist } from "@sanity/assist";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
  name: "default",
  title: "Studio_C4force",
  projectId: "xbob71w4",
  dataset: "production",

  plugins: [
    structureTool(),
    assist(),
    colorInput(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: "http://localhost:3000",
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
