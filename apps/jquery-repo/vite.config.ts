import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: '../server/dist/jquery-build',
		emptyOutDir: true
	},
	base: '/jquery',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, '../styles')
		}
	}
});
