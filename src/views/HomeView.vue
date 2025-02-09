<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import WebsiteCard from '@/components/cards/WebsiteCard.vue';
import LayoutBase from '@/components/layouts/LayoutBase.vue';
import sites from '@/resources/sites';

import ProiconsSearch from '@/components/icons/ProiconsSearch.vue';

const init = ref(false);
const query = ref('');

const indexedSites = sites.map((site, index) => {
    return { id: index, ...site };
});

const sitesFiltered = computed(() => {
    return indexedSites.filter((site) => {
        const siteRepresentation = `${site.link} ${site.name} ${site.year} ${site.skills?.reduce((skill, all) => {
            return `${skill} ${all}`;
        })}`;

        return siteRepresentation.includes(query.value);
    });
});

onMounted(() => {
    setTimeout(() => {
        init.value = true;
    }, 200);
});
</script>

<template>
    <LayoutBase>
        <template #content>
            <section class="w-full flex flex-col items-center">
                <div :class="`transition-all duration-700 text ${init ? 'w-full' : 'w-1/5'} border-b flex items-center gap-2 text-lg overflow-clip`">
                    <ProiconsSearch class="w-4 h-4 shrink-0" />
                    <input class="w-full focus:outline-hidden text-ellipsis flex-1" v-model="query" placeholder="Search by name, year, website or skill" />
                </div>
            </section>
            <section class="flex gap-8 flex-wrap py-8 justify-center">
                <WebsiteCard v-for="(site, index) in sitesFiltered" :key="index" :site="site" />
            </section>
        </template>
    </LayoutBase>
</template>
