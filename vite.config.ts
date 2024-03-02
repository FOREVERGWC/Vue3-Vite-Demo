import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080/',
                // target: 'http://139.196.209.10:8080/',
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
