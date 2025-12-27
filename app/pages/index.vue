<script setup lang="ts">

import { useAuth } from '#imports';
const { login, form, msg } = useAuth()
useHead({
    title: 'POS Login',

})


</script>
<template>

    <div class="min-h-screen flex items-center bg-neutral-200 justify-center p-4 bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">POS Login</h1>
                <p class="text-sm text-gray-500">Masuk ke sistem Point of Sale</p>
            </div>

            <!-- Form -->
            <form class="space-y-4" @submit.prevent="login">
                <!-- Username -->
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <!-- <input v-model="form.username" type="text" placeholder="Masukkan username"
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /> -->
                    <div class="w-full w-full mx-auto">
                        <input v-model="form.username" id="username" type="text" placeholder="Username"
                            class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50">
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium font-sans text-gray-700 mb-1">
                        Password
                    </label>
                    <div class="w-full w-full mx-auto">
                        <input v-model="form.password" id="password" type="password" placeholder="********"
                            class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50">
                    </div>
                </div>

                <!-- Error -->
                <p v-if="msg" class="text-sm text-red-500">
                    {{ msg }}
                </p>

                <!-- Button -->
                <button type="submit" class="relative w-full overflow-hidden bg-[#1B211A] text-white py-2 rounded-lg font-semibold
                        before:absolute before:inset-0 before:bg-zinc-600
                        before:scale-x-0 before:origin-center
                        before:transition-transform before:duration-300
                        hover:before:scale-x-100 rounded-2xl">
                    <span class="relative z-10">Login</span>
                </button>

            </form>
            <!-- Footer -->
            <div class="text-center mt-6 text-sm text-gray-400">
                © 2025 POS System
            </div>

        </div>
    </div>
</template>