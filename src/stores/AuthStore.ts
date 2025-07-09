import { shallowRef, ref, reactive, type Component } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('Auth', () => {
    const userData = ref();

    return {
        userData,
    };
});
