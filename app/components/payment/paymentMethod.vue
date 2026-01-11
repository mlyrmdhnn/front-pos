<script setup lang="ts">
import { QrCode, Banknote, X } from 'lucide-vue-next'
import { useToast } from '#imports'
const { show } = useToast()
const emit = defineEmits(['close'])
const paymentMethods = [
    {
        key: 'cash',
        label: 'Cash',
        desc: 'Pay directly with cash',
        icon: Banknote,
    },
    {
        key: 'qris',
        label: 'QRIS',
        desc: 'Scan QR using e-wallet',
        icon: QrCode,
    },
]
const selectedMethod = ref<string | null>(null)

const selectMethod = (key: string) => {
    selectedMethod.value = key
}

const continueCheckout = () => {
    if (selectedMethod.value == 'cash') {
        return navigateTo('/payment-cash')
    }
    if (selectedMethod.value == 'qris') {
        return navigateTo('/payment-qris')
    }

    show('Please select payment method', 'error')

}

</script>

<template>
    <!-- Overlay -->
    <div class="fixed inset-0 z-[99] bg-black/40 flex items-center justify-center">
        <!-- Modal -->
        <div class="w-full max-w-md rounded-xl bg-white shadow-lg p-6 space-y-5">

            <!-- Header -->
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-800">
                    Select Payment Method
                </h2>
                <button @click="emit('close')" class="text-gray-400 hover:text-gray-600">
                    <X />
                </button>
            </div>

            <!-- Payment Options -->
            <div class="grid grid-cols-1 gap-4">
                <div v-for="method in paymentMethods" :key="method.key" @click="selectMethod(method.key)" class="flex items-center justify-between rounded-lg border p-4
             cursor-pointer transition" :class="[
                selectedMethod === method.key
                    ? 'border-[#1B211A] bg-blue-50'
                    : 'border-gray-200 hover:border-[#1B211A] hover:bg-blue-50'
            ]">
                    <div class="flex items-center gap-3">
                        <div class="p-2 rounded-md" :class="selectedMethod === method.key ? 'bg-blue-100' : ''">
                            <component :is="method.icon" />
                        </div>

                        <div>
                            <p class="font-medium text-gray-800">
                                {{ method.label }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ method.desc }}
                            </p>
                        </div>
                    </div>

                    <!-- indicator -->
                    <div class="h-4 w-4 rounded-full border" :class="selectedMethod === method.key
                        ? 'bg-[#1B211A] border-[#1B211A]'
                        : 'border-gray-300'" />
                </div>
            </div>

            <!-- Action -->
            <button @click="continueCheckout" class="w-full rounded-lg bg-[#1B211A] py-3 text-white font-medium
                   hover:bg-[#1B213D] transition">
                Continue
            </button>
        </div>
    </div>
</template>