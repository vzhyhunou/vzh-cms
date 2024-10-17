import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// eslint-disable-next-line no-unused-vars
const {REACT_APP_SRC, REACT_APP_BASE, ...rest} = process.env;

const config = {
    plugins: [react(), eslint()],
    server: {
        port: 3010
    },
    define: {
        'process.env': {
            REACT_APP_SRC,
            REACT_APP_BASE
        }
    },
    build: {
        outDir: process.env.BUILD_PATH
    },
    base: process.env.REACT_APP_BASE
};

const srcConfig = {
    back: {
        ...config,
        server: {
            ...config.server,
            proxy: {
                '/api': {
                    target: 'http://localhost:8090'
                },
                '/login': {
                    target: 'http://localhost:8090'
                },
                '/static': {
                    target: 'http://localhost:8090'
                }
            }
        }
    },
    fake: config
};

export default defineConfig(srcConfig[process.env.REACT_APP_SRC]);