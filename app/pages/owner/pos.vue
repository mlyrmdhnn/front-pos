<script setup lang="ts">
import { useProduct } from '~/composables/product/useProducts';
import { usePayProduct } from '~/composables/product/usePayProduct';
import { useToast } from '#imports';

const { show } = useToast()


const { selectedProducts, setProductSelected, priceTotal, increaseItem, decreaseItem } = usePayProduct()
const { dataProduct, getProduct, meta } = useProduct()
useHead({
    title: 'POS'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

onMounted(() => {
    getProduct()
})

const showPaymentMethod = ref(false)
const setShowPaymentMehtod = () => {
    if (selectedProducts.value.length < 1) {
        show("Please Select an order", "info");
        return;
    }
    showPaymentMethod.value = true
}

</script>
<template>
    <PaymentMethod v-if="showPaymentMethod" @close="showPaymentMethod = false" />
    <section>
        <div class=" grid grid-cols-2 lg:grid-cols-12 gap-2">
            <div class="bg-neutral-200 col-span-2 xl:col-span-9 object-fit">

                <div class="bg-white rounded p-2 flex gap-2">
                    <input type="text" placeholder="search" class="input">
                    <select name="" id="">
                        <option selected>Choose Category </option>
                        <option value="">k</option>
                        <option value="">k</option>
                        <option value="">k</option>
                    </select>
                </div>
                <!-- {{ dataProduct }} -->
                <div class="mt-6">

                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        <div v-for="d in dataProduct" @click="setProductSelected(d)"
                            class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-neutral-400">
                            <div class="h-32 w-full bg-yellow-500">
                                <span href="#">
                                    <img class="mx-auto h-full " :src="d.image_url" alt="">
                                </span>
                            </div>
                            <div class="pt-6">

                                <div>
                                    <h1>{{ d.name }}</h1>
                                    <h1 class="text-sm">Stok : {{ d.quantity }}</h1>
                                </div>

                                <div>Category : {{ d.category.name }}</div>

                                <div class="mt-4 flex items-center justify-between gap-4">
                                    <p class="text-1xl font-bold leading-tight text-gray-900 ">IDR
                                        {{ d.price.toLocaleString() }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded shadow-sm col-span-2 max-h-screen overflow-auto xl:col-span-3">
                <div class="p-6 space-y-6">

                    <!-- TITLE -->
                    <h2 class="text-lg font-semibold">
                        Order Summary
                    </h2>

                    <!-- ORDER LIST -->
                    <div class="border rounded-lg divide-y text-sm overflow-hidden">
                        <template v-for="(d, i) in selectedProducts" :key="d.id">
                            <div class="p-4 space-y-2 bg-white hover:bg-gray-50 transition">

                                <div class="flex justify-between items-center">
                                    <span class="text-gray-500">Product</span>
                                    <span class="font-medium text-gray-800 truncate max-w-[140px]">
                                        {{ d.name }}
                                    </span>
                                </div>

                                <div class="flex justify-between items-center">
                                    <span class="text-gray-500">Sub Total</span>
                                    <span class="font-semibold text-gray-900">
                                        IDR {{ (d.price * d.totalItem).toLocaleString() }}
                                    </span>
                                </div>

                                <div class="flex justify-between items-center">
                                    <span class="text-gray-500">Shipping</span>
                                    <span class="text-gray-400">—</span>
                                </div>

                                <div class="flex justify-between items-center">
                                    <button class="bg-neutral-300 p-1 rounded text-slate-700"
                                        @click="increaseItem(d.id)">+</button>
                                    <span>{{ d.totalItem }}</span>
                                    <button class="bg-neutral-300 p-1 rounded text-slate-700"
                                        @click="decreaseItem(d.id)">-</button>
                                </div>

                            </div>
                        </template>

                        <!-- TOTAL -->
                        <div class="flex justify-between items-center p-4 bg-gray-50 font-semibold text-base">
                            <span>Total</span>
                            <span>IDR {{ priceTotal.toLocaleString() }}</span>
                        </div>
                    </div>

                    <!-- CHECKOUT BUTTON -->
                    <button @click="setShowPaymentMehtod"
                        class="w-full bg-[#1B211A] hover:bg-[#1B213D] text-white py-3 rounded-lg font-medium transition">
                        Checkout Now
                    </button>
                </div>
            </div>

        </div>
    </section>
</template>