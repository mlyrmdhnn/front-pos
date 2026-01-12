<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
import { Pencil } from 'lucide-vue-next';
import ConfirmDelete from '~/components/product/confirmDelete.vue';
import { useProduct } from '~/composables/product/useProducts';
const { getDetailProduct, productDetail, isLoading, deleteProduct, isLoadingMsg } = useProduct()

definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})

useHead({
    title: 'Detail Product'
})


const fetching = async () => {
    await getDetailProduct()
    console.log(productDetail.value)
}
fetching()

const show = ref(false)

const showConfirmDelete = () => {
    show.value = !show.value
}

const update = (uuid: string) => {
    navigateTo(`/product-update/?prd=${uuid}`)
}

</script>
<template>
    <ConfirmDelete @close="show = false" v-if="show" @confirm="deleteProduct(productDetail.uuid)"
        :loading="isLoadingMsg" />
    <section class="space-y-4">

        <!-- Header -->
        <header class="flex items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm">
            <h1 class="text-xl font-semibold text-slate-700">
                Detail Product
            </h1>

            <div class="flex gap-2">
                <button @click="update(productDetail.uuid)"
                    class="flex items-center gap-2 rounded-md bg-sky-500 px-3 py-2 text-sm text-white transition hover:bg-sky-600">
                    <Pencil class="h-4 w-4" />
                    Update
                </button>

                <button @click="showConfirmDelete"
                    class="flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600">
                    <Trash2 class="h-4 w-4" />
                    Delete
                </button>
            </div>
        </header>

        <div class="rounded-lg bg-white p-6 shadow-sm">
            <section v-if="isLoading" class="w-full h-full">
                <Loading />
            </section>
            <section v-if="!isLoading">

                <div class="mb-6 flex h-64 w-full items-center justify-center rounded-lg bg-slate-100 ">

                    <img :src="productDetail.image_url" alt="No image available"
                        class="h-full max-h-60 rounded-md object-contain" />
                </div>



                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div class="space-y-3 text-slate-700">
                        <div>
                            <p class="text-sm text-slate-400">Product Name</p>
                            <p class="font-medium">{{ productDetail.name }}</p>
                        </div>

                        <div>
                            <p class="text-sm text-slate-400">Category</p>
                            <p class="font-medium">
                                {{ productDetail.category?.name ?? '-' }}
                            </p>
                        </div>

                        <div>
                            <p class="text-sm text-slate-400">Price</p>
                            <p class="font-medium">
                                IDR {{ productDetail.price }}
                            </p>
                        </div>

                        <div>
                            <p class="text-sm text-slate-400">Stock</p>
                            <p class="font-medium">
                                {{ productDetail.quantity }}
                            </p>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <p class="mb-1 text-sm text-slate-400">Description</p>
                        <p class="text-sm leading-relaxed text-slate-600">
                            {{ productDetail.description || 'No description available.' }}
                        </p>
                    </div>

                </div>
            </section>
        </div>

    </section>
</template>