<script setup lang="ts">
useHead({
    title: 'Transaction'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})
</script>
<template>
    <h1>halo</h1>
</template>