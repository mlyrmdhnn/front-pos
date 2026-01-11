<script setup lang="ts">
import { useProduct } from '~/composables/product/useProducts';
import { useCreateProduct } from '~/composables/product/useCreateProduct';
const { productCategory, getCategory, } = useProduct()
const { form, submit, handleImage, imagePreview } = useCreateProduct()
const config = useRuntimeConfig()

useHead({
    title: 'Create Product'
})

definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin',
})
onMounted(getCategory)

</script>

<template>
    <section class="bg-slate-100 p-6">
        <div class="mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">

            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-xl font-semibold text-slate-800">
                    Create New Product
                </h1>
                <p class="text-sm text-slate-500">
                    Tambahkan produk baru ke sistem
                </p>
            </div>

            <!-- Form -->
            <form class="grid grid-cols-1 md:grid-cols-2 gap-5" @submit.prevent="submit">

                <!-- Product Name -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Product Name
                    </label>
                    <input v-model="form.name" type="text" placeholder="Nama produk" class="input" />
                </div>


                <!-- Price -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Price
                    </label>
                    <input v-model="form.price" type="number" placeholder="Harga" class="input" />
                </div>

                <!-- Stock -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Stock
                    </label>
                    <input v-model="form.stock" type="number" placeholder="Jumlah stok" class="input" />
                </div>

                <!-- Gambar -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Image
                    </label>
                    <input @change="handleImage" type="file" class="input" accept="image/*">
                </div>


                <!-- Category -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Category
                    </label>
                    <select v-model="form.category" class="input bg-white">
                        <option value="">Select category</option>
                        <option v-for="(c, i) in productCategory" :key="i" :value="c.id">{{ c.name }}</option>
                    </select>
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                    <label class="block text-sm text-slate-600 mb-1">
                        Description
                    </label>
                    <textarea v-model="form.description" rows="4" placeholder="Deskripsi produk"
                        class="input resize-none" />
                </div>

                <!-- Action -->
                <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                    <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                                           bg-[#1B211A] hover:bg-[#141914] transition">
                        Create Product
                    </button>
                </div>

            </form>
        </div>
    </section>
</template>