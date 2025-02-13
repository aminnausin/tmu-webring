<script setup lang="ts">
import Navbar from '@/components/layouts/NavBar.vue';
</script>

<template>
    <main class="relative gap-4 flex flex-col items-center h-screen overflow-y-auto w-full p-6 md:py-12 md:px-24 text-[#e2e0e2] lowercase font-dm-sans">
        <Navbar />
        <slot name="content"></slot>
        <a
            href="https://github.com/aminnausin/tmu-webring/fork"
            class="absolute bottom-4 md:px-4 p-1 text-sm bg-neutral-950/50 rounded-full text-neutral-200 hover:text-purple-600 hover:bg-white"
        >
            add your site {{ 'here' }}
        </a>
    </main>
</template>
