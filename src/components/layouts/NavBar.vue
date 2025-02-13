<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <nav class="[&>*]:py-2 gap-4 [&>*]:hover:text-purple-600 w-full flex justify-start flex-wrap">
        <RouterLink to="/" title="home page">Home</RouterLink>
        <RouterLink to="/map" title="skill map">Map</RouterLink>
        <a href="https://github.com/aminnausin/tmu-webring" target="_blank" title="github repo">Github</a>
        <!-- <a href="https://github.com/aminnausin/tmu-webring" target="_blank" title="Github Repo">McGill Webring</a> -->
        <!-- <a href="https://github.com/aminnausin/tmu-webring" target="_blank" title="Github Repo">Carlton Webring</a> -->
        <!-- <a href="https://github.com/aminnausin/tmu-webring" target="_blank" title="Github Repo">Waterloo Webring</a> -->
    </nav>
</template>
