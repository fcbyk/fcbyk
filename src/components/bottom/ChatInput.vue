<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    maxRows: {
        type: Number,
        default: 6
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const inputValue = ref(props.modelValue)
const baseLineHeight = ref(24)

// 监听外部传入的 modelValue 变化
watch(() => props.modelValue, (newVal) => {
    inputValue.value = newVal
    adjustHeight()
})

// 自动调整高度
const adjustHeight = () => {
    nextTick(() => {
        if (!textareaRef.value) return
        textareaRef.value.style.height = 'auto'
        const contentHeight = textareaRef.value.scrollHeight
        const maxHeight = baseLineHeight.value * props.maxRows
        textareaRef.value.style.height = `${Math.min(contentHeight, maxHeight)}px`
    })
}

// 处理输入
const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    inputValue.value = target.value
    emit('update:modelValue', inputValue.value)
    adjustHeight()
}

// 处理提交
const handleSubmit = () => {
    if (inputValue.value.trim() && !props.loading) {
        emit('submit', inputValue.value.trim())
        adjustHeight()
    }
}

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !props.loading) {
        e.preventDefault()
        handleSubmit()
    }
}

onMounted(() => {
    if (textareaRef.value) {
        const style = window.getComputedStyle(textareaRef.value)
        baseLineHeight.value = parseInt(style.lineHeight) || 24
        adjustHeight()
    }
})
</script>

<template>
    <div class=" bg-[#F7F7F7] p-2 pl-0"> 
        <!-- 输入框容器 --> 
        <div
            class="flex items-end transition-all duration-200">

            <textarea ref="textareaRef" v-model="inputValue"
                class=" flex-1 px-2 py-[6px] pr-14 rounded-[5px] resize-none bg-[#FFFFFF] focus:outline-none text-gray-800 placeholder-gray-400 overflow-y-auto no-scrollbar"
                :placeholder="placeholder" :disabled="disabled || loading" rows="1" @input="handleInput"
                @keydown="handleKeyDown" :style="{
                    maxHeight: `${baseLineHeight * maxRows}px`
                }" />
                

            <button :disabled="!inputValue.trim() || loading" @click="handleSubmit"
                class=" text-white w-7 h-7 mx-2 mb-1 flex items-center justify-center rounded-full transition-colors"
                :class="{
                    'bg-gray-300  cursor-not-allowed': !inputValue.trim() || loading,
                    'bg-blue-500  hover:bg-blue-600 cursor-pointer': inputValue.trim() && !loading
                }">
                <svg width="12" height="14" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z"
                        fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z"
                        fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z"
                        fill="currentColor"></path>
                </svg>
            </button>
        </div>
    </div>
</template>