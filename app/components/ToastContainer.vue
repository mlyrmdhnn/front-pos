<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        <TransitionGroup name="toast" tag="div" class="flex flex-col gap-3">
            <div v-for="toast in toasts" :key="toast.id"
                class="pointer-events-auto min-w-[280px] rounded-lg px-4 py-3 text-sm shadow-lg text-white" :class="{
                    'bg-emerald-600': toast.type === 'success',
                    'bg-red-600': toast.type === 'error',
                    'bg-neutral-400': toast.type === 'info'
                }">
                {{ toast.message }}
            </div>
        </TransitionGroup>
    </div>
</template>

<style>
.toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.25s ease;
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>