import adapter from '@sveltejs/adapter-auto';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	files: {
		assets: 'src/firebase-config.js',
	}
};

export default config;
