import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 3000,
		cors: {
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
		},
		proxy: {
			'/api': {
				target : 'http://localhost:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				secure: false,
				ws: true
			},
		},
	},
};

export default config;
