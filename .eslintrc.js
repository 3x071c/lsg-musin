/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
const config = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:astro/recommended",
		"airbnb-base",
		"plugin:prettier/recommended",
	],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"airbnb-typescript/base",
				"plugin:prettier/recommended",
			],
			files: ["*.{tsx,ts}"],
			parserOptions: {
				ecmaFeatures: {
					impliedStrict: true,
					jsx: true,
				},
				extraFileExtensions: [".astro"],
				parser: "@typescript-eslint/parser",
				project: ["./tsconfig.json"],
				sourceType: "module",
				tsconfigRootDir:
					__dirname /* This line is the only reason why the entire file is JS :vomiting_face: */,
				warnOnUnsupportedTypeScriptVersion: true,
			},
			plugins: ["@typescript-eslint"],
			rules: {
				"@typescript-eslint/no-non-null-assertion":
					"off" /* Required as TypeScript doesn't recognize complex type assertions */,
			},
		},
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
		},
		{
			files: ["*.{tsx,ts}"],
			parser: "@typescript-eslint/parser",
		},
	],
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true,
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: ["import"],
	root: true,
	rules: {
		/* Shared Rules for both JS and TS */
		"import/no-cycle":
			"off" /* False positives :*( A litte too conservative with ES6 modules */,
		"import/order": [
			"warn",
			{
				alphabetize: {
					order: "asc",
				},
				groups: [
					"type",
					"builtin",
					"external",
					"internal",
					"parent",
					"sibling",
					"index",
					"object",
					"unknown",
				],
				pathGroups: [
					{
						group: "internal",
						pattern: "~**",
						position: "before",
					},
				],
			},
		] /* Custom settings */,
		"import/prefer-default-export": "off" /* This makes no sense */,
		"no-cond-assign": [
			"error",
			"except-parens",
		] /* Added 'except-parens' option */,
		"no-dupe-else-if": "warn" /* airbnb: not enabled yet */,
		"no-empty": [
			"error",
			{ allowEmptyCatch: true },
		] /* airbnb: added allowEmptyCatch option */,
		"no-import-assign": "warn" /* airbnb: not enabled yet */,
		"no-void": "off" /* False positives + outdated */,
		"require-await": "error" /* Prevent unnecessary async functions */,
		"sort-keys": "warn" /* sort object keys */,
		"sort-vars": "warn" /* sort variable declarations */,
	},
};
module.exports = config;
