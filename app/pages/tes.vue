<script setup lang="ts">
const fetchMe = async () => {
    const res = await $fetch('/api/me')
    console.log(res)
}
</script>
<template>
    <div class="bg-neutral-200 p-2 rounded-lg">
        <h1 class="text-2xl">Testing Page</h1>
    </div>
    <div class="mt-16 p-4">
        <button @click="fetchMe" class="bg-neutral-200 p-2 rounded-md">Fetch Me</button>
    </div>
</template>