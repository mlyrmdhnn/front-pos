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



const { dataProduct, getProduct, meta, isLoading, getCategory, productCategory, fetchProduct, selectedCategory, onCategoryChange } = useProduct()
useHead({
    title: 'Product'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

const fetching = async () => {
    await getProduct()
    await getCategory()
}
fetching()



</script>
<template>
    <section>
        <div class="bg-neutral-200 object-fit">
            <div class="bg-white rounded p-2 flex gap-2">
                <input type="text" placeholder="search" class="input">
                <select v-model="selectedCategory" @change="onCategoryChange" class=" px-3 py-2
         rounded-lg border border-slate-300
         bg-white text-sm
         focus:outline-none focus:ring-2 focus:ring-[#1B211A]/30
         transition">
                    <option value="">All</option>
                    <option v-for="(p, i) in productCategory" :key="i" :value="p.id">{{
                        p.name }}</option>
                </select>
            </div>

            <div class="mt-6">
                <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    <template v-if="isLoading">
                        <ProductSkeleton />
                    </template>
                    <template v-if="!isLoading">
                        <div v-for="(d, i) in dataProduct" @click="detailProduct(d.uuid)" :key="i"
                            class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:border-neutral-400">
                            <div class="h-32 w-full bg-neutral-300 rounded overflow-hidden">
                                <span href="#" class="text-slate-700">
                                    <img class="mx-auto h-full " :src="d.image_url" alt="No image Available">
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
                            <button :disabled="meta.current_page <= 1" @click="fetchProduct(meta.current_page - 1)"
                                class="px-3 py-1.5 text-sm rounded-md
               text-slate-700 hover:bg-slate-100
               disabled:text-slate-400
               disabled:cursor-not-allowed transition">
                                Prev
                            </button>

                            <!-- First -->
                            <button v-if="pages[0] > 1" @click="fetchProduct(1)"
                                class="px-3 py-1.5 text-sm rounded-md hover:bg-slate-100">
                                1
                            </button>

                            <span v-if="pages[0] > 2" class="px-2 text-slate-400">…</span>

                            <!-- Pages -->
                            <button v-for="p in pages" :key="p" @click="fetchProduct(p)"
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
                                @click="fetchProduct(meta.last_page)"
                                class="px-3 py-1.5 text-sm rounded-md hover:bg-slate-100">
                                {{ meta.last_page }}
                            </button>

                            <!-- Next -->
                            <button :disabled="meta.current_page >= meta.last_page"
                                @click="fetchProduct(meta.current_page + 1)" class="px-3 py-1.5 text-sm rounded-md
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
    </section>
</template>