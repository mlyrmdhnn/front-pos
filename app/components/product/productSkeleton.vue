<template>
    <div v-for="d in 8" :key="d" class="relative overflow-hidden
                            rounded-lg border border-gray-200
                            bg-neutral-300 p-6 shadow-sm
                            animate-pulse">
        <!-- shimmer -->
        <div class="absolute inset-0
           -translate-x-full
           bg-gradient-to-r
           from-transparent
           via-white/40
           to-transparent
           animate-shimmer"></div>
        <div class=" h-32 w-full">
            <span href="#">
                <img class="mx-auto h-full " src="" alt="">
            </span>
        </div>
        <div class="pt-6">
            <div>
                <h1></h1>
                <h1 class="text-sm"></h1>
            </div>


            <div class="mt-4 flex items-center justify-between gap-4">
                <p class="text-1xl font-bold leading-tight text-gray-900 ">

                </p>
            </div>
        </div>
    </div>
</template>