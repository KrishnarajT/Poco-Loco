/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./root/**/*.{html,js}",
		"./node_modules/tw-elements/dist/js/**/*.js",
	],
	theme: {
		extend: {},
	},
	plugins: [require("tw-elements/dist/plugin.cjs")],
	// darkMode: "class",
};
