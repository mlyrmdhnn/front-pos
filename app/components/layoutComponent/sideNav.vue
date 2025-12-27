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
    { name: 'Create Product', path: '' },
    { name: 'Kategori', path: '/owner/category' },
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
const logout = async () => {
    await $fetch('/api/logout', {
        method: 'POST'
    })
    navigateTo('/')
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
                    <LogOut />
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