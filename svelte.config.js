import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
		  // default options are shown. On some platforms
		  // these options are set automatically — see below
		  pages: 'build',
		  assets: 'build',
		  fallback: 'index.html',
		  precompress: false,
		  //strict: true
		}),
		alias: {
			$lib: './src/lib',
			$components: './src/lib/components',
			$images:'./src/lib/images',
			$styles: './src/lib/styles',
			$utils:'./src/utils',
			$stores: './src/stores',
		},
	  }
};

export default config;
