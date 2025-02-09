<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav class="[&>*]:py-2 gap-4 [&>*]:hover:text-purple-600 w-full flex justify-start">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
    </nav>
</template>
