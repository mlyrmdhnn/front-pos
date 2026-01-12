<script setup lang="ts">
// import { useAuth } from '#imports'
import { LogOut, ShoppingCart, Menu } from 'lucide-vue-next'
import { useMe } from '#imports'
const { getMe, user } = useMe()

const route = useRoute()

const menus = [
    { name: 'Dashboard', path: '/dashboard/owner-dashboard' },
    { name: 'Kasir (POS)', path: '/owner/pos' },
    { name: 'Produk', path: '/owner/product' },
    { name: 'Create Product', path: '/owner/create-product' },
    { name: 'Transaksi', path: '/owner/transaction' },
    { name: 'Create User', path: '/owner/create-user' }
]
getMe()





// const now = ref<Date | null>(null)
// const isClient = ref(false)

// let timer: ReturnType<typeof setInterval> | null = null

// onMounted(() => {
//     isClient.value = true
//     now.value = new Date()

//     timer = setInterval(() => {
//         now.value = new Date()
//     }, 1000)
// })

// onUnmounted(() => {
//     if (timer) clearInterval(timer)
// })

// const dateTime = computed(() => {
//     if (!isClient.value || !now.value) return ''

//     const date = now.value.toLocaleDateString('id-ID', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//     })

//     const hour = String(now.value.getHours()).padStart(2, '0')
//     const minute = String(now.value.getMinutes()).padStart(2, '0')

//     return `${date} • ${hour}:${minute}`
// })
const isLoading = ref(false)
const logout = async () => {
    isLoading.value = true
    try {
        await $fetch('/api/logout', {
            method: 'POST'
        })
        navigateTo('/')
    } catch (e: any) { }
    finally {
        isLoading.value = false
    }
}
</script>
<template>
    <!-- SIDEBAR -->
    <aside class="hidden border-r lg:block fixed top-0 left-0 h-screen w-56 bg-slate-100">
        <div class="bg-neutral-100 p-4 flex items-center">
            <span class="rounded p-1 bg-[#1B211A] text-white">
                <ShoppingCart />
            </span>
            <span class="font-semibold ml-2 text-[1.2rem] font-sans">Mung Store</span>
        </div>

        <div class="flex flex-col bg-neutral-100 h-full justify-between">
            <div class="flex flex-col gap-3 mt-4 px-2">
                <template v-for="m in menus" :key="m.name">
                    <nuxt-link
                        :class="['rounded p-1 transition duration-200', route.fullPath === m.path ? 'bg-neutral-300' : '']"
                        :to="m.path">
                        <span class="text-neutral-700 font-semibold">{{ m.name }}</span>
                    </nuxt-link>
                </template>
            </div>

            <div class="bg-neutral-100 border-neutral-200 border-t-2 mb-16 flex justify-between px-2">
                <nuxt-link to="/proffile">
                    <div class="px-2 py-2">
                        <h1 class="text-[16px] max-w-32 max-h-18 overflow-auto font-semibold text-slate-900">
                            {{ user?.name }}
                        </h1>
                        <h1 class="text-sm">
                            {{
                                (user?.role === 'super_admin' ? 'Super Admin' : '') ||
                                (user?.role === 'manager' ? 'Manager' : '')
                            }}
                        </h1>
                    </div>
                </nuxt-link>

                <button @click="logout" class="p-1 text-slate-500">
                    <LogOut v-if="!isLoading" />


                    <div role="status" v-if="isLoading">
                        <svg aria-hidden="true" class="w-6 h-6 text-neutral-tertiary animate-spin fill-brand"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </div>


                </button>
            </div>
        </div>
    </aside>

    <!-- NAVBAR -->
    <header
        class="fixed flex px-2 items-center justify-between lg:pr-72 w-full top-0 lg:left-64 right-0 h-16 z-10 bg-neutral-100">
        <div>
            <span class="hidden lg:flex"></span>
            <span class="lg:hidden">
                <Menu />
            </span>
        </div>
        <!-- <span class="p-1 rounded font-light">{{ dateTime }}</span> -->
        ok

    </header>
</template>