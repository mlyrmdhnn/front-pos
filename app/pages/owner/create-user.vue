<script setup lang="ts">

import { useCreateUser } from '#imports';
const { formCreateUser, userCreate } = useCreateUser()
useHead({
    title: 'Create User'
})
definePageMeta({

    layout: 'main',
    middleware: 'auth',
    role: 'super_admin',
})


</script>


<template>
    <section class="bg-slate-100 p-6">
        <div class=" mx-auto bg-white rounded-xl border border-slate-200 p-2 lg:p-6 shadow-sm">
            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-xl font-semibold text-slate-800">
                    Create New User
                </h1>
                <p class="text-sm text-slate-500">
                    Tambahkan user baru ke sistem
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="userCreate" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- Username -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Username
                    </label>
                    <input type="text" placeholder="username" v-model="formCreateUser.username" class="input" />
                </div>

                <!-- Name -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Name
                    </label>
                    <input type="text" placeholder="Full name" v-model="formCreateUser.name" class="input" />
                </div>

                <!-- Phone -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Phone Number
                    </label>
                    <input type="text" placeholder="08xxxxxxxxxx" v-model="formCreateUser.phone" class="input" />
                </div>

                <!-- Role -->
                <div>
                    <label class="block text-sm text-slate-600 mb-1">
                        Role
                    </label>
                    <select v-model="formCreateUser.role" class="input bg-white">
                        <option value="">Select role</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="manager">Manager</option>
                        <option value="cashier">Cashier</option>
                    </select>
                </div>

                <!-- Password -->
                <div class="md:col-span-2">
                    <label class="block text-sm text-slate-600 mb-1">
                        Password
                    </label>
                    <input type="password" placeholder="••••••••" v-model="formCreateUser.password" class="input" />
                </div>

                <!-- Action -->
                <div class="md:col-span-2 flex justify-end gap-3 pt-4">
                    <button type="submit" class="px-5 py-2 rounded-lg text-sm text-white
                                   bg-[#1B211A] hover:bg-[#141914] transition">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
