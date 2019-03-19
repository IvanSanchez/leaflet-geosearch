// import fs from "fs";
// import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import { uglify } from "rollup-plugin-uglify";
// import ignore from "rollup-plugin-ignore";
// import image from "rollup-plugin-image";
// import fileAsBlob from "rollup-plugin-file-as-blob";
// import { string } from "rollup-plugin-string";

const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: "src/index.js",
		output: {
			sourcemap: true,
			format: "iife",
			name: "leafletGeosearch",
			file: "dist/leaflet-geosearch-src.js",
		},
		plugins: [
      buble({
        objectAssign: 'Object.assign'
      }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				preferBuiltins: true,
				browser: true,
			}),
			commonjs({}),

			// If we're building for production (npm run build
			// instead of npm run dev), transpile and minify
			// 		production && buble({ include: ['src/**', 'node_modules/svelte/shared.js'] }),
			// 		production && uglify()
		],
	},


	{
		input: "src/index.js",
		output: {
			sourcemap: false,
			format: "iife",
			name: "leafletGeosearch",
			file: "dist/leaflet-geosearch.js",
		},
		plugins: [
      buble({
        objectAssign: 'Object.assign'
      }),
			resolve({
				preferBuiltins: true,
				browser: true,
			}),
			commonjs({}),
			uglify()
		],
	},
];
