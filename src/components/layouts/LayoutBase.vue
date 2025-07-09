<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore';

import SiteRequestForm from '@/components/forms/SiteRequestForm.vue';
import Navbar from '@/components/layouts/NavBar.vue';

const modal = useModalStore();
</script>

<template>
    <main class="relative gap-4 flex flex-col items-center min-h-screen p-3 md:p-6 md:pb-16">
        <Navbar />
        <slot></slot>
        <!-- <a
            href="https://github.com/aminnausin/tmu-webring/fork"
            class="absolute bottom-4 md:px-4 p-1 text-sm bg-neutral-950/50 rounded-full text-neutral-200 hover:text-purple-600 hover:bg-white"
        >
            add your site {{ 'here' }}
        </a> -->
        <button
            class="absolute bottom-4 md:px-4 p-1 text-sm bg-neutral-950/50 rounded-full text-neutral-200 hover:text-purple-600 hover:bg-white"
            @click="modal.open(SiteRequestForm)"
        >
            add your site {{ 'here' }}
        </button>
    </main>
</template>
