<script setup lang="ts">

import chatBot from '~/components/layoutComponent/chatBot.vue';
import sideNav from '~/components/layoutComponent/sideNav.vue';

</script>


<template>
    <div class="h-screen overflow-hidden">
        <side-nav />
        <main class="lg:ml-56 mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-neutral-200 p-6">
            <slot />
            <ToastContainer />
        </main>
        <chat-bot />
    </div>
</template>