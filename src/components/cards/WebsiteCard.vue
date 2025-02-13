<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { Website } from '@/types/types';

const props = withDefaults(
    defineProps<{
        site: Website;
    }>(),
    {
        site: () => ({
            name: 'Fareen',
            year: '2020',
            link: new URL('https://fareenkhan.vercel.app/'),
            skills: ['java', 'swift'],
        }),
    },
);
</script>

<template>
    <a :href="site.link.toString()" class="hover:bg-neutral-950/50 text-neutral-300 hover:text-purple-600 rounded-2xl md:rounded-full">
        <h2 class="md:px-4 p-1 text-sm md:text-base break-all md:line-clamp-1">
            {{ site.link.toString().trim().replace('https://', '').replace('http://', '').replace(/\/$/, '') }}
        </h2>
    </a>
</template>
