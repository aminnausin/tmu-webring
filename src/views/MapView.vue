<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import { Network, type Edge, type Node } from 'vis-network';

import LayoutBase from '@/components/layouts/LayoutBase.vue';
import sites from '@/resources/sites';
import ProiconsArrowRight from '@/components/icons/ProiconsArrowRight.vue';

const legendOpen = ref(true);

const indexedSites = sites.map((site, index) => {
    return { id: index, ...site };
});

const skillSet = ref<Set<string>>(new Set());
const skillColors = ref<Record<string, string>>({
    java: '#42b883',
    swift: '#f7df1e',
    'c#': '#ff5733',
    blazor: '#007acc',
    php: '#007acc',
    vue: 'rgb(66, 184, 131)',
    'next.js': '#007acc',
    react: '#007acc',
});

const graph = useTemplateRef('graph');

const getRandomColor = () => {
    return `hsl(${Math.random() * 360}, 70%, 60%)`; // Generates bright colors
};

const generateGraph = () => {
    if (!graph.value) return;

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const skillCounter: Record<string, number> = {};

    skillSet.value = new Set<string>();

    indexedSites.forEach((student) => {
        nodes.push({
            id: student.id,
            label: student.name,
            shape: 'hexagon',
            size: 12,

            color: {
                background: `#ff5733`,
                border: '#444444',
            },
            font: { color: '#ffffff', size: 16 }, // Move label below
        });

        student.skills?.forEach((skill) => {
            if (!skillSet.value.has(skill)) {
                if (!skillColors.value[skill]) {
                    skillColors.value[skill] = getRandomColor();
                }

                const color = skillColors.value[skill];

                nodes.push({ id: skill, label: skill, shape: 'circle', color: color, font: { size: 16, face: 'dm-sans' } });
            }

            edges.push({ from: student.id, to: skill });

            skillCounter[skill] = (skillCounter[skill] || 0) + 1;
            skillSet.value.add(skill);
        });
    });

    nodes.forEach((node) => {
        if (node.shape === 'circle') {
            const skill = node.id as string;
            const count = skillCounter[skill] || 0;
            // console.log(node);

            node.font = { size: 10 + count * 5 };
        }
    });

    const data = { nodes, edges };

    const options = {
        edges: {
            color: '#8620a6',
            width: 1,
            arrows: 'to',
        },
        nodes: { borderWidth: 2 },
        physics: { stabilization: false },
    };

    new Network(graph.value, data, options);
};

watch(() => graph.value, generateGraph);
</script>

<template>
    <LayoutBase>
        <template #content>
            <section class="w-full flex flex-col items-center my-auto md:px-16">
                <!-- Graph options -->
            </section>
            <section class="relative ring-2 ring-neutral-700/10 rounded-2xl">
                <div ref="graph" class="h-[80vh] w-full">
                    <!-- Vis Network Graph -->
                    The graph did not work...
                </div>
                <span
                    :class="`group overflow-hidden absolute bottom-0 left-0 rounded-tr-lg border-b-0 border-l-0 border border-neutral-600/70 origin-bottom-left bg-neutral-900/80 text-sm backdrop-blur-xl`"
                >
                    <div
                        :class="`relative grid grid-cols-3 gap-2 px-4 py-2 scrollbar-minimal overflow-clip transition-all duration-500 ${legendOpen ? 'w-full sm:w-[300px] pe-[64px] max-h-[10vh]' : 'w-[30px] h-[30px]'}`"
                    >
                        <button
                            @click="legendOpen = !legendOpen"
                            :class="`${legendOpen ? 'opacity-0 group-hover:opacity-100' : ''} rounded-bl-lg flex absolute top-0 right-0 h-[30px] w-[30px] cursor-pointer rounded-tr-lg bg-primary-500 text-white transition-opacity justify-center items-center bg-purple-600`"
                        >
                            <ProiconsArrowRight :class="`w-5 h-5 shrink-0 hover:h-6 hover:w-6 ${legendOpen ? 'rotate-[135deg]' : '-rotate-45'}`" />
                        </button>
                        <div v-for="(skill, index) in skillSet" :key="index" class="flex items-center gap-2">
                            <div class="h-3 w-3 rounded-full" :style="`background-color: ${skillColors[skill]}`"></div>
                            <span class="capitalize">{{ skill }}</span>
                        </div>
                    </div>
                </span>
            </section>
        </template>
    </LayoutBase>
</template>
