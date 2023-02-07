import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 3000,
		cors: {
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: ['Content-Type', 'Authorization']
		},
		proxy: {
			'/user/login': {
				target : 'http://localhost:8080',
				changeOrigin: true,
			},
		},
	},
};

export default config;
