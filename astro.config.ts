import partytown from "@astrojs/partytown";
import compressor from "astro-compressor";
import htmlMinifier from "astro-html-minifier";
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		astroImageTools,
		partytown({}),
		htmlMinifier(),
		compressor(),
	],
	vite: {
		ssr: {
			external: ["svgo"], // for the astro-icon tool
		},
	},
});
