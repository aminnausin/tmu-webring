<script setup lang="ts">
import BaseModal from '@/components/modals/BaseModal.vue';
import ButtonForm from '../inputs/ButtonForm.vue';
import { toast } from '@/service/toaster/toastService';
</script>

<template>
    <BaseModal>
        <template #title> Add your website to the webring! </template>
        <template #description>Submit a request with your information, and I will get back to you.</template>
        <div>Hi</div>
        <ButtonForm variant="submit" @click="toast.error('No one is around to help...')">Help</ButtonForm>
    </BaseModal>
</template>
