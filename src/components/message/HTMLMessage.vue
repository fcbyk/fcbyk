<template>
    <div class="text-message" :class="{
        'bg-[#95ec69] ml-10 rounded-br-none user-message-arrow ': role === 'user',
        'bg-white mr-10 rounded-bl-none my-message-arrow': role === 'me',
        'opacity-80': status === 'loading'
    }">

        <div class="flex justify-center gap-1 mt-2" v-if="status === 'loading'">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse animation-delay-200"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse animation-delay-400"></div>
        </div>

        <div class="leading-normal break-words" v-else v-html="sanitizedContent"></div>
    </div>
</template>

<script setup>
import DOMPurify from 'dompurify'
import { computed } from 'vue'

const props = defineProps({
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    status: {
        type: String,
        required: true,
        default: 'loading'
    },
    content: {
        type: String,
        required: true,
        default: ''
    }
})

const sanitizedContent = computed(() => DOMPurify.sanitize(props.content))
</script>

<style scoped>
.text-message {
    border-radius: 8px;
    padding: 10px 14px;
    max-width: calc(100% - 48px);
    box-shadow: 0 1px 1px rgba(73, 73, 73, 0.1);
    position: relative;
}
</style>