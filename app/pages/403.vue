<script setup lang="ts">
useHead({
    title: '403 • Access Denied'
})
// definePageMeta({
//     requiresAuth: true,
//     role: ['manager', 'super_admin', 'casher']
// })
// const user = useCookie('user')
// const path = ref<string>('')
// if (user.value?.role == 'super_admin') {
//     path.value = '/dashboard/owner-dashboard'
// }
// if (user.value?.role == 'manager') {
//     path.value = '/dashboard/manager-dashboard'
// }
// if (user.value?.role == 'casher') {
//     path.value = '/dashboard'
// }
// const backToLogin = () => {
//     user.value = null
// }

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div class="max-w-md text-center px-6">

            <p class="text-sm font-semibold text-slate-400 tracking-widest mb-2">
                ERROR 403
            </p>

            <h1 class="text-7xl font-bold text-white mb-4">
                Access Denied
            </h1>

            <p class="text-slate-300 text-sm mb-8 leading-relaxed">
                You don’t have permission to access this page.
                Please make sure you are logged in with the correct account.
            </p>

            <div class="flex justify-center gap-3">
                <!-- <NuxtLink @click="backToLogin" to="/auth/login"
                    class="px-5 py-2 rounded-md bg-white text-slate-900 text-sm font-medium hover:bg-slate-200 transition">
                    Login
                </NuxtLink>

                <NuxtLink :to="path || '/'"
                    class="px-5 py-2 rounded-md border border-slate-600 text-slate-200 text-sm hover:bg-slate-700 transition">
                    Back to Home
                </NuxtLink> -->
            </div>

        </div>
    </div>
</template>