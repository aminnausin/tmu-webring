import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import viteCompression from 'vite-plugin-compression';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import Icons from 'unplugin-icons/vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
        viteCompression(),
        Icons({
            compiler: 'vue3',
            autoInstall: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src', import.meta.url)),
        },
    },
    root: '.',
    build: {
        outDir: path.resolve(__dirname, 'internal/web/dist'),
        emptyOutDir: true, // deletes old files on each build
    },
});
