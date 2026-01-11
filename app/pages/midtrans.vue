<script setup lang="ts">
const kirim = async () => {
    const res = await $fetch('http://localhost:8000/api/transactions', {
        method: "POST"
    })
    console.log(res)
}
</script>
<template>
    <h1>Testing Midtrans</h1>
    <button @click="kirim">Api ke midtrans</button>
</template>