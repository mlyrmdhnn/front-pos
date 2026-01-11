<!-- eslint-disable import/no-duplicates -->
<script setup lang="ts">
import { Box } from 'lucide-vue-next';
import { NotebookText } from 'lucide-vue-next';
import { CircleDollarSign } from 'lucide-vue-next';
import { Notebook } from 'lucide-vue-next';
import { Tag } from 'lucide-vue-next';
import { useProduct } from '~/composables/product/useProducts';
const { getCategory, productCategory, getProduct, dataProduct } = useProduct()
const fetching = async () => {
    await getProduct()
    await getCategory()
}
fetching()

definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

useHead({
    title: 'Dashboard'
})

const cardInfo = computed(() => [
    { icon: Box, count: dataProduct.value.length, label: 'Total Product' },
    { icon: Tag, count: productCategory.value.length, label: 'Total Category' },
    { icon: NotebookText, count: 0, label: 'Today Transactions' },
    { icon: CircleDollarSign, count: `Rp0`, label: 'Income Today' }
])




</script>
<template>

    <section>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div v-for="(c, i) in cardInfo" :key="i" class="bg-white flex items-center p-4">
                <div>
                    <div class="text-black border-2 p-2">
                        <component :is="c.icon" />
                    </div>
                </div>
                <div class=" ml-4">
                    <h1 class="text-2xl font-semibold">{{ c.count }}</h1>
                    <h1 class="text-sm text-neutral-700">{{ c.label }}</h1>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 mt-10 gap-4">
            <div class="w-full bg-white h-[30rem]">
                <header class="p-4 border-b-2">
                    <span class="font-semibold text-neutral-700">Transaksi Terbaru</span>
                </header>
                <section class="p-4">
                    <!-- if start -->
                    <div class="flex flex-col h-[15rem] justify-end">
                        <div class="flex justify-center">
                            <span class="text-gray-400">
                                <Notebook :size="50" />
                            </span>
                        </div>
                        <div class="flex justify-center">
                            <span class="text-gray-500">Belum ada transaksi</span>
                        </div>
                    </div>
                    <!-- if end -->
                </section>
            </div>
            <div class="w-full bg-white h-[30rem] flex flex-col">
                <header class="p-4 border-b-2">
                    <span class="font-semibold text-neutral-700">Produk Terlaris</span>
                </header>

                <section class="p-4 flex-1 overflow-auto">
                    <div v-for="i in 10" :key="i"
                        class="border border-neutral-200 p-3 flex justify-between items-center rounded-lg bg-white mb-3 last:mb-0">

                        <!-- LEFT -->
                        <div class="flex items-center gap-3">
                            <!-- ICON / NUMBER -->
                            <div
                                class="w-10 h-10 flex justify-center items-center rounded-md bg-neutral-200 text-sm font-semibold text-neutral-700">
                                {{ i }}
                            </div>

                            <!-- TEXT -->
                            <div class="leading-tight">
                                <h3 class="text-sm font-medium text-neutral-800">Sate Madura</h3>
                                <h3 class="text-xs text-neutral-500">Makanan Khas Madura</h3>
                            </div>
                        </div>

                        <!-- RIGHT -->
                        <div class="text-right leading-tight">
                            <h1 class="text-lg font-semibold text-neutral-800">0</h1>
                            <h1 class="text-xs text-neutral-500">Terjual</h1>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    </section>

</template>