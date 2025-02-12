import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import viteCompression from 'vite-plugin-compression';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), tailwindcss(), viteCompression()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    base: '/tmu-webring',
});
