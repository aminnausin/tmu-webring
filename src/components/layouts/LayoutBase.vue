<script setup lang="ts"></script>

<template>
    <div class="h-screen">
        <main
            class="grid grid-cols-1 lg:grid-cols-10 2xl:grid-cols-6 sm:p-6 gap-6 snap-y bg-primary-900 dark:bg-primary-dark-900 sm:bg-primary-950 sm:dark:bg-primary-dark-950 dark:text-[#e2e0e2] font-sans text-gray-900 antialiased overflow-x-clip"
        >
            <slot name="content"></slot>
        </main>
    </div>
</template>
