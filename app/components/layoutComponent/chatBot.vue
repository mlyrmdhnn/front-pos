<!-- eslint-disable vue/attributes-order -->
<script setup lang="ts">
import { useAi } from '#imports';
import { MessageCircleMore } from 'lucide-vue-next';

const { prompt, result, askAI, isLoading, isDisabled } = useAi()
const isChatOpen = ref(false)
const chatContainer = ref<HTMLElement | null>(null)


const scrollToBottom = () => {
    nextTick(() => {
        if (!chatContainer.value) return
        chatContainer.value.scrollTo({
            top: chatContainer.value.scrollHeight,
            behavior: 'smooth'
        })
    })
}

onMounted(() => {
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            isChatOpen.value = false
        }
    }
    window.addEventListener('keydown', onKeyDown)
})

watch(
    () => result.value.length, () => {
        scrollToBottom()
    }
)

watch(isLoading, () => {
    scrollToBottom()
})

watch(isChatOpen, (open) => {
    if (open) {
        scrollToBottom()
    }
})

const setIsChatOpen = () => {
    isChatOpen.value = !isChatOpen.value
}
</script>
<template>
    <div class="fixed bottom-4 xl:right-10 right-2 z-50">
        <button @click="setIsChatOpen()"
            class="w-14 h-14 rounded-full bg-[#1B211A] text-white shadow-lg flex items-center justify-center text-2xl hover:bg-zinc-800 transition">
            <MessageCircleMore :size="30" />
        </button>
    </div>
    <div class="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden
                     transition-[height] duration-300 ease-in-out" :class="isChatOpen ? 'h-96' : 'h-0'">
        <!-- HEADER -->
        <div class="bg-[#1B211A] text-white p-3 font-semibold flex justify-between items-center">
            <span>Chatbot</span>
            <button @click="isChatOpen = false">✕</button>
        </div>

        <!-- MESSAGES -->
        <div ref="chatContainer" class="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            <div v-for="(msg, i) in result" :key="i" class="flex"
                :class="msg.type === 'user' ? 'justify-end' : 'justify-start'">
                <div class="max-w-[80%] rounded-lg p-3" :class="msg.type === 'user'
                    ? 'bg-[#1B211A] text-white'
                    : 'bg-gray-200 text-black'">
                    <div v-for="(d, j) in msg.data" :key="j" class="space-y-2">
                        <p class="whitespace-pre-line">
                            {{ d.text }}
                        </p>

                        <ul v-if="d.list?.length" class="list-disc pl-5 space-y-1">
                            <li v-for="(l, k) in d.list" :key="k">
                                {{ l.text }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="isLoading" class="flex justify-start">
                <div class="bg-gray-200 rounded-lg px-4 py-2">
                    <div class="typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>


        <!-- INPUT -->
        <div class="border-t p-2 flex gap-2">
            <input type="text" placeholder="Ketik pesan..." v-model="prompt"
                class="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-[#1B211A]" />
            <button :disabled="isDisabled" @click="askAI"
                :class="[' text-white px-3 rounded-lg text-sm', isDisabled ? 'bg-[#2A344A] cursor-not-allowed' : 'bg-[#1B211A]']">
                Kirim
            </button>
        </div>
    </div>
</template>
<style scoped>
.typing {
    display: flex;
    gap: 4px;
    align-items: center;
}

.typing span {
    width: 6px;
    height: 6px;
    background-color: #555;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing span:nth-child(1) {
    animation-delay: 0s;
}

.typing span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0% {
        transform: translateY(0);
        opacity: 0.4;
    }

    20% {
        transform: translateY(-5px);
        opacity: 1;
    }

    40% {
        transform: translateY(0);
        opacity: 0.4;
    }

    100% {
        transform: translateY(0);
        opacity: 0.4;
    }
}
</style>