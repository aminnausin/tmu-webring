<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/map">About</RouterLink>
        </nav>
    </header>
    <section>
        <div class="flex-col">
            <input placeholder="Search by name, year, website or skill" />
        </div>
        <div></div>
    </section>

    <RouterView />
</template>
