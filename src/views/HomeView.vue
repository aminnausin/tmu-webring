<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import WebsiteCard from '@/components/cards/WebsiteCard.vue';
import LayoutBase from '@/components/layouts/LayoutBase.vue';
import sites from '@/resources/sites';

import ProiconsSearch from '@/components/icons/ProiconsSearch.vue';

const init = ref(false);
const query = ref('');
const randomLink = ref('');

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

const generateRandomLink = () => {
    if (!sitesFiltered.value || sitesFiltered.value.length === 0) randomLink.value = '';
    randomLink.value = sitesFiltered.value[Math.floor(Math.random() * sitesFiltered.value.length)].link.toString() ?? '';
};

onMounted(() => {
    setTimeout(() => {
        init.value = true;
    }, 200);
});

watch(() => sitesFiltered.value, generateRandomLink, { immediate: true });
</script>

<template>
    <LayoutBase>
        <section class="w-full flex items-center flex-col sm:flex-row gap-4">
            <div :class="`transition-all duration-700 text ${init ? 'w-full' : 'w-1/5'} border-b flex items-center gap-2 overflow-clip flex-1`">
                <ProiconsSearch class="w-4 h-4 shrink-0" />
                <input
                    class="w-full focus:outline-hidden text-ellipsis flex-1 lowercase bg-transparent border-0 focus:ring-0"
                    v-model="query"
                    title="Search for a website"
                    placeholder="Search by name, year, website or skill"
                />
            </div>
            <a class="bg-purple-600/50 hover:bg-purple-600 px-4 lowercase rounded-xl line-clamp-1" :href="randomLink" title="Open a random website from the list below">
                {{ randomLink || !init ? 'Lucky Me' : 'Unlucky' }}
            </a>
        </section>
        <section class="flex gap-y-2 gap-8 flex-wrap sm:py-8 justify-center">
            <WebsiteCard v-for="(site, index) in sitesFiltered" :key="index" :site="site" />
        </section>
    </LayoutBase>
</template>
