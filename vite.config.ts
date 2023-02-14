import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		//hmr: {overlay:false},
		port: 3000,
		cors: {
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
		},
		proxy: {
			'/api': {
				target : 'https://port-0-acafe-springboot-1jx7m2gldi7x7be.gksl2.cloudtype.app:8080/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				secure: false,
				ws: true
			},
		},
	},
});
