import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: '../server/dist/react-build',
		emptyOutDir: true
	},
	base: '/react',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, '../styles')
		}
	}
});
