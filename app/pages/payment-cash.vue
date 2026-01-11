<script setup lang="ts">
import { ref, computed } from 'vue'
import { Banknote, ArrowLeft } from 'lucide-vue-next'
import { usePayProduct } from '~/composables/product/usePayProduct'
import { usePaymentStore } from '~/store/payment'
const { totalPrice } = usePaymentStore()
import { useMe } from '#imports'
const { getMe, user } = useMe()

const klik = async () => {


}

const price = ref(totalPrice)
const cashReceived = ref<number | null>(null)

const change = computed(() => {
    if (!cashReceived.value) return 0
    return cashReceived.value - price.value
})

const isEnough = computed(() => {
    return cashReceived.value !== null && cashReceived.value >= price.value
})
</script>

<template>
    <div class="min-h-screen min-w-screen flex items-center justify-center bg-neutral-200">
        <div class="w-full">
            <section class="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
                <!-- Header -->
                <div class="flex items-center gap-3 mb-6">
                    <Banknote class="text-neutral-700" />
                    <h1 class="text-lg font-semibold text-neutral-800">
                        Cash Payment
                    </h1>
                </div>

                <!-- Total -->
                <div class="border rounded-lg p-4 mb-4">
                    <p class="text-sm text-neutral-500">Total Payment</p>
                    <p class="text-2xl font-semibold text-neutral-800">
                        Rp {{ price.toLocaleString() }}
                    </p>
                </div>

                <!-- Input Cash -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-neutral-600 mb-1">
                        Cash Received
                    </label>
                    <input type="number" v-model="cashReceived" placeholder="Masukkan uang diterima" class="w-full rounded-lg border border-neutral-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-[#1B211A]" />
                </div>

                <!-- Change -->
                <div class="border rounded-lg p-4 mb-6">
                    <p class="text-sm text-neutral-500">Change</p>
                    <p class="text-xl font-semibold" :class="change < 0 ? 'text-red-600' : 'text-emerald-600'">
                        Rp {{ change.toLocaleString() }}
                    </p>

                    <p v-if="change < 0" class="text-sm text-red-500 mt-1">
                        Uang tidak cukup
                    </p>
                </div>

                <!-- Action -->
                <button @click="klik" :disabled="!isEnough" class="w-full py-3 rounded-lg font-medium transition
                 bg-[#1B211A] text-white
                 disabled:bg-neutral-300 disabled:cursor-not-allowed">
                    Confirm Payment
                </button>
            </section>
        </div>
    </div>
</template>