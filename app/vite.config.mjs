import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [react(), eslint()],
    server: {
        port: 3010,
        proxy: {
            '/api': {
                target: 'http://localhost:8090'
            },
            '/login': {
                target: 'http://localhost:8090'
            }
        }
    },
    define: {
        'process.env': process.env
    },
    build: {
        outDir: process.env.BUILD_PATH
    },
    base: process.env.REACT_APP_BASE
});