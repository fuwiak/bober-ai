import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// No markdown collections — site content lives in TS modules under src/content/*.ts
const unused = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({}).passthrough(),
});

export const collections = { articles: unused };
