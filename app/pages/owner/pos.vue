<script setup lang="ts">
import { useProduct } from '~/composables/product/useProducts';
const { dataProduct, getProduct } = useProduct()
useHead({
    title: 'POS'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

const fetching = async () => {
    await getProduct()
}
fetching()
</script>
<template>
    <section>
        <div class=" grid grid-cols-2 lg:grid-cols-12 gap-2">
            <div class="bg-neutral-200 col-span-2 xl:col-span-9">
                <div class="bg-white rounded p-2 flex gap-2">
                    <input type="text" placeholder="search" class="input">
                    <select name="" id="">
                        <option selected>Choose Category </option>
                        <option value="">k</option>
                        <option value="">k</option>
                        <option value="">k</option>
                    </select>
                </div>
                <div class="mt-6">
                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        <div v-for="d in dataProduct" class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                            <div class="h-32 w-full bg-yellow-500">
                                <span href="#">
                                    <img class="mx-auto h-full dark:hidden"
                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard.svg"
                                        alt="">
                                    <img class="mx-auto hidden h-full dark:block"
                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard-dark.svg"
                                        alt="">
                                </span>
                            </div>
                            <div class="pt-6">

                                <div>
                                    <h1>{{ d.name }}</h1>
                                    <h1 class="text-sm">Stok : {{ d.quantity }}</h1>
                                </div>

                                <div class="mt-4 flex items-center justify-between gap-4">
                                    <p class="text-1xl font-extrabold leading-tight text-gray-900 ">Rp
                                        {{ d.price }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded shadow-sm col-span-2 max-h-24 xl:col-span-3">okma</div>
        </div>
    </section>
</template>