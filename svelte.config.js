import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
		  // default options are shown. On some platforms
		  // these options are set automatically — see below
		  pages: 'build',
		  assets: 'build',
		  fallback: null,
		  precompress: false,
		  strict: true
		}),
		prerender:{
			//앱으로빌드할 경우 true로 설정합니다. 
			default:true 
		}
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
