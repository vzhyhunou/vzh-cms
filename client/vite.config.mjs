import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const config = ({
    REACT_APP_SRC,
    REACT_APP_BASE,
    BUILD_PATH
}) => ({
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
        outDir: BUILD_PATH
    },
    base: REACT_APP_BASE
});

const srcConfig = {
    back: params => (config => ({
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
    }))(config(params)),
    fake: config
};

export default defineConfig(
    ({mode}) => (
        params => srcConfig[params.REACT_APP_SRC](params)
    )(loadEnv(mode, process.cwd(), ''))
);