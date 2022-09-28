import partytown from "@astrojs/partytown";
import compressor from "astro-compressor";
import htmlMinifier from "astro-html-minifier";
import { astroImageTools } from "astro-imagetools";
import NetlifyCMS from "astro-netlify-cms";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		astroImageTools,
		partytown({}),
		htmlMinifier(),
		NetlifyCMS({
			config: {
				backend: {
					branch: "trunk",
					name: "git-gateway",
				},
				collections: [
					{
						files: [
							{
								fields: [
									{
										label: "Titel",
										name: "title",
										widget: "string",
									},
									{
										label: "Ticker",
										name: "ticker",
										widget: "string",
									},
								],
								file: ".cms/content/landing.md",
								label: "Startseite",
								name: "Landing",
							},
						],
						label: "Seiten",
						name: "pages",
					},
				],
				locale: "de",
				media_folder: "public/uploads",
				public_folder: "uploads",
				publish_mode: "editorial_workflow",
			},
			previewStyles: [
				"https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.5/css/pico.min.css", // for some reason, the local file is imported on the top-level instead of in the preview pane iframe, so let's revert to a cdn
				[
					"html, body { padding: 16px; } body { border: 1px dashed #7f7f7f; border-radius: 16px; }",
					{ raw: true },
				],
			],
		}),
		compressor(),
	],
	vite: {
		ssr: {
			external: ["svgo"], // for the astro-icon tool
		},
	},
});
