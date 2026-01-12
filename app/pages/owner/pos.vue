<script setup lang="ts">
import { useProduct } from '~/composables/product/useProducts';
import { usePayProduct } from '~/composables/product/usePayProduct';
import { useToast } from '#imports';

const { show } = useToast()

const pages = computed(() => {
    const current = meta.value.current_page;
    const last = meta.value.last_page;

    const delta = 2; // jumlah halaman kiri-kanan
    const range: number[] = [];

    for (
        let i = Math.max(1, current - delta);
        i <= Math.min(last, current + delta);
        i++
    ) {
        range.push(i);
    }

    return range;
});


const { selectedProducts, setProductSelected, priceTotal, increaseItem, decreaseItem } = usePayProduct()
const { dataProduct, getProduct, meta, isLoading, getCategory, productCategory } = useProduct()
useHead({
    title: 'POS'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

const fetching = () => {
    getProduct()
    getCategory()
}
fetching()


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
                    <select class=" px-3 py-2
         rounded-lg border border-slate-300
         bg-white text-sm
         focus:outline-none focus:ring-2 focus:ring-[#1B211A]/30
         transition">
                        <option value="">All</option>
                        <option v-for="(p, i) in productCategory" :value="p.id">{{ p.name }}</option>
                    </select>
                </div>


                <!-- {{ dataProduct }} -->
                <div class="mt-6">
                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">

                        <template v-if="isLoading">
                            <ProductSkeleton />
                        </template>
                        <template v-if="!isLoading">

                            <div v-for="d in dataProduct" @click="setProductSelected(d)"
                                class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-neutral-400">
                                <div class="h-32 w-full bg-neutral-300 rounded overflow-hidden">
                                    <span href="#" class="text-slate-700">
                                        <img class="mx-auto h-full " :src="d.image_url" alt="No image available">
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
                        </template>
                    </div>
                    <ClientOnly>
                        <div class="mt-6 flex justify-center">
                            <div class="inline-flex items-center gap-1
             rounded-lg border border-slate-200
             bg-white p-1 shadow-sm">
                                <!-- Prev -->
                                <button :disabled="meta.current_page <= 1" @click="getProduct(meta.current_page - 1)"
                                    class="px-3 py-1.5 text-sm rounded-md
               text-slate-700 hover:bg-slate-100
               disabled:text-slate-400
               disabled:cursor-not-allowed transition">
                                    Prev
                                </button>

                                <!-- First -->
                                <button v-if="pages[0] > 1" @click="getProduct(1)"
                                    class="px-3 py-1.5 text-sm rounded-md hover:bg-slate-100">
                                    1
                                </button>

                                <span v-if="pages[0] > 2" class="px-2 text-slate-400">…</span>

                                <!-- Pages -->
                                <button v-for="p in pages" :key="p" @click="getProduct(p)"
                                    class="px-3 py-1.5 text-sm rounded-md transition" :class="p === meta.current_page
                                        ? 'bg-[#1B211A] text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                        ">
                                    {{ p }}
                                </button>

                                <span v-if="pages[pages.length - 1] < meta.last_page - 1" class="px-2 text-slate-400">
                                    …
                                </span>

                                <!-- Last -->
                                <button v-if="pages[pages.length - 1] < meta.last_page"
                                    @click="getProduct(meta.last_page)"
                                    class="px-3 py-1.5 text-sm rounded-md hover:bg-slate-100">
                                    {{ meta.last_page }}
                                </button>

                                <!-- Next -->
                                <button :disabled="meta.current_page >= meta.last_page"
                                    @click="getProduct(meta.current_page + 1)" class="px-3 py-1.5 text-sm rounded-md
               text-slate-700 hover:bg-slate-100
               disabled:text-slate-400
               disabled:cursor-not-allowed transition">
                                    Next
                                </button>
                            </div>
                        </div>
                    </ClientOnly>
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