<script setup lang="ts">
import { useProduct } from '~/composables/product/useProducts';
import { usePayProduct } from '~/composables/product/usePayProduct';
import { useToast } from '#imports';

const { show } = useToast()


const { dataProduct, getProduct, meta, detailProduct } = useProduct()
useHead({
    title: 'Product'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

onMounted(() => {
    getProduct()
})



</script>
<template>
    <section>
        <div class="bg-neutral-200 object-fit">

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
                    <div v-for="d in dataProduct" @click="detailProduct"
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
    </section>
</template>