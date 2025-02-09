<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import { Network, type Edge, type Node, type Options } from 'vis-network';

import LayoutBase from '@/components/layouts/LayoutBase.vue';
import sites from '@/resources/sites';
import ProiconsArrowRight from '@/components/icons/ProiconsArrowRight.vue';

const legendOpen = ref(true);

const studentLinks = ref<Record<number, URL>>({});
const indexedSites = sites.map((site, index) => {
    return { id: index, ...site };
});

const skillSet = ref<Set<string>>(new Set());
const skillColors = ref<Record<string, { bg: string; text?: string }>>({
    java: { bg: '#e11e22', text: '#ffffff' },
    swift: { bg: '#ff6e01', text: '#ffffff' },
    'c#': { bg: '#390091', text: '#ffffff' },
    php: { bg: '#787cb4' },
    laravel: { bg: '#ff291a' },
    vue: { bg: '#3fb984' },
});

const graph = useTemplateRef('graph');

const getRandomColor = () => {
    const hue = Math.random() * 360;
    const bg = `hsl(${hue}, 70%, 60%)`;

    return { bg, text: '#0B1215' };
};

const generateGraph = () => {
    if (!graph.value) return;

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const skillCounter: Record<string, number> = {};

    skillSet.value = new Set<string>();
    studentLinks.value = {};

    indexedSites.forEach((student) => {
        nodes.push({
            id: student.id,
            label: student.name,
            shape: 'hexagon',
            size: 12,
            borderWidthSelected: 2,
            color: {
                background: `#14549d`,
                border: '#14549d',
                highlight: {
                    background: '#fcdd04',
                    border: '#14549d',
                },
            },
            font: { color: '#ffffff', size: 10, face: 'DM Sans' },
            title: student.link.toString(),
        });

        studentLinks.value[student.id] = student.link;

        student.skills?.forEach((skill) => {
            if (!skillSet.value.has(skill)) {
                if (!skillColors.value[skill]) {
                    skillColors.value[skill] = getRandomColor();
                }

                const color = skillColors.value[skill];

                nodes.push({
                    id: skill,
                    label: skill,
                    shape: 'circle',
                    color: color.bg,
                    font: { size: 16, face: 'DM Sans', color: color.text ?? '#0B1215' },
                    labelHighlightBold: false,
                });
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

            const currentFont = (node.font as object) ?? {};
            node.font = { ...currentFont, size: 10 + count * 5 };
        }
    });

    const data = { nodes, edges };

    const options: Options = {
        edges: {
            color: {
                highlight: '#fcdd04fa',
                color: '#14549d',
            },
            width: 1,
            arrows: 'to',
        },
        nodes: { borderWidth: 2 },
        physics: { stabilization: false },
    };

    const network = new Network(graph.value, data, options);

    network.on('click', (params) => {
        const nodeId = params.nodes[0];
        if (nodeId !== undefined && !isNaN(parseInt(nodeId)) && studentLinks.value[nodeId]) {
            window.open(studentLinks.value[nodeId], '_blank');
        }
    });
};

watch(() => graph.value, generateGraph);
</script>

<template>
    <LayoutBase>
        <template #content>
            <section class="w-full flex flex-col items-center my-auto md:px-16">
                <!-- Graph options -->
            </section>
            <section class="relative ring-2 ring-neutral-700/10 rounded-2xl w-full">
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
                            <div class="h-3 w-3 rounded-full" :style="`background-color: ${skillColors[skill].bg}`"></div>
                            <span class="capitalize">{{ skill }}</span>
                        </div>
                    </div>
                </span>
            </section>
        </template>
    </LayoutBase>
</template>
