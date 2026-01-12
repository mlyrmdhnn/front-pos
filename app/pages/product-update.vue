<script setup lang="ts">
import { compose } from 'node:stream';
import { useProduct } from '~/composables/product/useProducts';
import { useUpdateProduct } from '~/composables/product/useUpdateProduct';
const { getDetailProduct, productDetail, getCategory, productCategory, isLoading } = useProduct()
const { handleImage, submit, imagePreview, formUpdate, isLoadingMsg } = useUpdateProduct()


definePageMeta({
    layout: 'main',
    middleware: 'auth'
})

useHead({
    title: 'Product Edit'
})
const fetching = async () => {
    await getDetailProduct()
    await getCategory()
    formUpdate.value.id = productDetail.value.id
    formUpdate.value.name = productDetail.value.name
    formUpdate.value.price = productDetail.value.price
    formUpdate.value.stock = productDetail.value.quantity
    formUpdate.value.category = productDetail.value.category_id
    formUpdate.value.description = productDetail.value.description
}
fetching()
</script>
<template>

    <section class="bg-slate-100 p-6">
        <Loading v-if="isLoading" />
        <div v-else class="mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">

            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-xl font-semibold text-slate-800">
                    Update product
                </h1>
                <p class="text-sm text-slate-500">
                    Updated the product
                </p>
            </div>

            <!-- Form -->
            <form class="grid grid-cols-1 md:grid-cols-2 gap-5" @submit.prevent="submit">

                <!-- Product Name -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Product Name
                    </label>
                    <input v-model="formUpdate.name" type="text" placeholder="Nama produk" class="input" />
                </div>


                <!-- Price -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Price
                    </label>
                    <input v-model="formUpdate.price" type="number" placeholder="Harga" class="input" />
                </div>

                <!-- Stock -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Stock
                    </label>
                    <input v-model="formUpdate.stock" type="number" placeholder="Jumlah stok" class="input" />
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Category
                    </label>
                    <select v-model="formUpdate.category" class="input bg-white">
                        <option value="">Select category</option>
                        <option v-for="(c, i) in productCategory" :key="i" :value="c.id">{{ c.name }}</option>
                    </select>
                </div>

                <!-- Gambar -->
                <div class="md:col-span-2">
                    <label class="block text-sm text-slate-600 mb-1">
                        Image
                    </label>
                    <input @change="handleImage" type="file" class="input" accept="image/*">
                </div>

                <div class="md:col-span-2 border border-slate-300 px-3 py-2 rounded-lg">
                    <label class="block text-sm text-slate-600 mb-1">
                        Preview
                    </label>
                    <div class="rounded overflow-hidden">
                        <img v-if="imagePreview" :src="imagePreview" alt="" class="h-full max-h-60">
                        <img v-else :src="productDetail.image_url" alt="" class="h-full max-h-60">
                    </div>
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                    <label class="block text-sm text-slate-600 mb-1">
                        Description
                    </label>
                    <textarea v-model="formUpdate.description" rows="4" placeholder="Deskripsi produk"
                        class="input resize-none" />
                </div>

                <!-- Action -->
                <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                    <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                                           bg-[#1B211A] hover:bg-[#141914] transition">
                        {{ isLoadingMsg ? 'Loading...' : 'Save Changes' }}
                    </button>
                </div>

            </form>
        </div>
    </section>
</template>