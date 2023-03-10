import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import stylelitPlugin from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin(), stylelitPlugin()],
	server: {
		host: 'localhost',
		port: 7070,
		open: true,
	},
});
