<script setup lang="ts">
useHead({
    title: 'Transaction'
})
definePageMeta({
    layout: 'main',
    middleware: 'auth',
    role: 'super_admin'
})
const summary = [
    { label: 'Total Transaksi', value: 120 },
    { label: 'Transaksi Hari Ini', value: 8 },
    { label: 'Pending', value: 3 },
]

const transactions = [
    {
        invoice: 'INV-001',
        customer: 'Budi',
        date: '2026-01-11',
        total: 'Rp 120.000',
        status: 'Paid',
    },
    {
        invoice: 'INV-002',
        customer: 'Siti',
        date: '2026-01-11',
        total: 'Rp 75.000',
        status: 'Pending',
    },
]

const statusClass = (status: string) => {
    if (status === 'Paid') return 'bg-green-100 text-green-700'
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
}
</script>
<template>
    <section class="space-y-6">

        <!-- HEADER -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-xl font-semibold text-neutral-800">Transaksi</h1>
                <p class="text-sm text-neutral-500">
                    Daftar transaksi terbaru yang terjadi di sistem
                </p>
            </div>
        </div>

        <!-- SUMMARY CARD -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="(c, i) in summary" :key="i" class="bg-white border border-neutral-200 rounded-lg p-4">
                <h1 class="text-2xl font-semibold text-neutral-800">{{ c.value }}</h1>
                <p class="text-sm text-neutral-500">{{ c.label }}</p>
            </div>
        </div>

        <!-- FILTER (DUMMY UI) -->
        <div class="bg-white border border-neutral-200 rounded-lg p-4 flex gap-3">
            <input type="text" placeholder="Cari transaksi..."
                class="border border-neutral-300 rounded-md px-3 py-2 text-sm w-64" />

            <select class="border border-neutral-300 rounded-md px-3 py-2 text-sm">
                <option>Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
            </select>
        </div>

        <!-- TABLE -->
        <div class="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-neutral-100 text-neutral-600">
                    <tr>
                        <th class="text-left px-4 py-3">Invoice</th>
                        <th class="text-left px-4 py-3">Customer</th>
                        <th class="text-left px-4 py-3">Tanggal</th>
                        <th class="text-right px-4 py-3">Total</th>
                        <th class="text-center px-4 py-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(t, i) in transactions" :key="i" class="border-t hover:bg-neutral-50">
                        <td class="px-4 py-3 font-medium text-neutral-800">
                            {{ t.invoice }}
                        </td>
                        <td class="px-4 py-3 text-neutral-700">
                            {{ t.customer }}
                        </td>
                        <td class="px-4 py-3 text-neutral-500">
                            {{ t.date }}
                        </td>
                        <td class="px-4 py-3 text-right font-medium">
                            {{ t.total }}
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="px-2 py-1 text-xs rounded-full" :class="statusClass(t.status)">
                                {{ t.status }}
                            </span>
                        </td>
                    </tr>

                    <!-- EMPTY STATE -->
                    <tr v-if="transactions.length === 0">
                        <td colspan="5" class="py-16 text-center text-neutral-400">
                            Belum ada transaksi
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </section>
</template>