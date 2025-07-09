<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav class="flex flex-col sm:flex-row items-center justify-start w-full">
        <img
            src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-colorful-interlocking-three-rings-icon-vector-design-png-image_4749803.png"
            alt="logo"
            class="w-16 h-16"
        />
        <span class="[&>*]:py-2 gap-4 [&>*]:hover:text-purple-600 flex justify-start flex-wrap flex-1">
            <RouterLink to="/" title="home page">Home</RouterLink>
            <RouterLink to="/map" title="skill map">Map</RouterLink>
            <a href="https://github.com/aminnausin/tmu-webring" target="_blank" title="github repo">Github</a>
            <RouterLink to="/admin" title="Admin">admin</RouterLink>
        </span>
    </nav>
</template>
