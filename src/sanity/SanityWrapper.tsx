"use client";

import { createDataAttribute } from "@sanity/visual-editing";
import React from "react";

export default function SanityWrapper({ id, type, path, children }: {
  id: string;
  type: string;
  path: string;
  children: React.ReactNode;
}) {
  const attr = createDataAttribute({ id, type, path });
  return <div data-sanity={attr().toString()}>{children}</div>;
}