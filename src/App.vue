<script setup lang="ts">
import type { ToastPostion } from '@/types/cedarTypes';

import { onMounted, ref } from 'vue';
import { getScreenSize } from '@/service/util';
import { RouterView } from 'vue-router';

import GlobalModal from '@/components/modals/GlobalModal.vue';
import ToastController from '@/components/cedarUI/ToastController.vue';

const toastPosition = ref<ToastPostion>();

onMounted(async () => {
    toastPosition.value = getScreenSize() === 'default' ? 'top-center' : 'bottom-left';
});
</script>

<template>
    <ToastController v-if="toastPosition" :position="toastPosition" />
    <GlobalModal />
    <RouterView />
</template>
