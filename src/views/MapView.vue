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
    python: { bg: '#3b74a3', text: '#ffffff' },
    javascript: { bg: '#f0dc55' },
    typescript: { bg: '#377cc8' },
    powerbi: { bg: '#feca22' },
    dart: { bg: '#33b9f6', text: '#ffffff' },
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
            title: student.link.toString(), // This doesn't seem to work
        });

        studentLinks.value[student.id] = student.link;

        student.skills?.forEach((skill) => {
            // This can be made better with less branching and more readable code
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
                    font: { size: 12, face: 'DM Sans', color: color.text ?? '#0B1215' },
                    labelHighlightBold: false,
                });
            } else {
                const skillNode = nodes.find((node) => node.id === skill);

                if (skillNode) {
                    const count = skillCounter[skill] || 0;

                    const currentFont = (skillNode.font as object) ?? {};
                    skillNode.font = { ...currentFont, size: 12 + count * 4 };
                }
            }

            edges.push({ from: student.id, to: skill });

            skillCounter[skill] = (skillCounter[skill] || 0) + 1;
            skillSet.value.add(skill);
        });
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
            <section class="relative border-2 border-neutral-600/30 rounded-2xl w-full overflow-clip">
                <div ref="graph" class="h-[80vh] w-full">
                    <!-- Vis Network Graph -->
                    The graph did not work...
                </div>
                <div :class="`group absolute bottom-0 left-0 text-sm w-full sm:w-[320px]`">
                    <span
                        :class="`relative grid xs:grid-cols-3 gap-2 sm:rounded-tr-lg border-t sm:border-r border-neutral-600/70 backdrop-blur-xl scrollbar-minimal scrollbar-hidden overflow-clip transition-all duration-500 ${legendOpen ? 'px-4 py-2 w-full pe-12 h-[10vh] overflow-y-auto' : 'w-8 h-8 rounded-tr-lg border-r'}`"
                    >
                        <button
                            @click="legendOpen = !legendOpen"
                            :class="`${legendOpen ? 'opacity-0 group-hover:opacity-100' : ''} absolute top-0 right-0 rounded-bl-lg flex h-8 w-8 cursor-pointer bg-primary-500 text-white transition-opacity justify-center items-center bg-purple-600`"
                            title="Open or close legend"
                        >
                            <ProiconsArrowRight :class="`w-5 h-5 shrink-0 hover:h-6 hover:w-6 ${legendOpen ? 'rotate-[135deg]' : '-rotate-45'}`" />
                        </button>
                        <div v-for="(skill, index) in skillSet" :key="index" :class="`flex items-center gap-2`">
                            <div class="h-3 w-3 rounded-full" :style="`background-color: ${skillColors[skill].bg}`"></div>
                            <span class="capitalize truncate" :title="skill">{{ legendOpen ? skill : '' }}</span>
                        </div>
                    </span>
                </div>
            </section>
        </template>
    </LayoutBase>
</template>
