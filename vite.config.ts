import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target : 'http://acafe-springboot:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				secure: false,
				ws: true
			},
		},
	},
});
