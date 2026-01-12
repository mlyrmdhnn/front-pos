<script setup lang="ts">
import { X, Trash2 } from 'lucide-vue-next'

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm'): void
}>()

defineProps<{
    title?: string
    description?: string
    loading?: boolean
}>()
</script>

<template>
    <!-- Overlay -->
    <div class="fixed inset-0 z-[99] bg-black/40 flex items-center justify-center">
        <!-- Modal -->
        <div class="w-full max-w-md rounded-xl bg-white shadow-lg p-6 space-y-5">

            <!-- Header -->
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-slate-800">
                    {{ title ?? 'Delete Confirmation' }}
                </h2>
                <button @click="emit('close')" class="text-slate-400 hover:text-slate-600">
                    <X />
                </button>
            </div>

            <!-- Content -->
            <div class="flex items-start gap-3">
                <div class="rounded-full bg-red-100 p-2 text-red-600">
                    <Trash2 />
                </div>
                <p class="text-sm text-slate-600 leading-relaxed">
                    {{ description ?? 'This action cannot be undone. Are you sure you want to delete this item?' }}
                </p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-3 pt-4">
                <button @click="emit('close')" class="rounded-lg border px-4 py-2 text-sm text-slate-600
                     hover:bg-slate-50 transition">
                    Cancel
                </button>

                <button @click="emit('confirm')" :disabled="loading" class="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2
                     text-sm text-white hover:bg-red-700 transition disabled:opacity-60">
                    <span v-if="!loading">Delete</span>
                    <span v-else>Deleting…</span>
                </button>
            </div>

        </div>
    </div>
</template>