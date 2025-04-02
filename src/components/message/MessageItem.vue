<template>
    <div class="flex gap-2 max-w-[90%]" :class="{
        'flex-row-reverse self-end': role === 'user',
        'self-start': role === 'me'
    }">
    
        <div class="w-[40px] h-[40px] rounded-[4px] overflow-hidden flex-shrink-0">
            <img class="object-cover w-full h-full" :src="role === 'user' ? userAvatar : myAvatar" :alt="role" />
        </div>

        <slot></slot>

    </div>
</template>

<script setup>
import chatConfig from '@/chat.config'

const userAvatar = chatConfig.avatar.user
const myAvatar = chatConfig.avatar.me

defineProps({
    role: {
        type: String,
        required: true
    }
})
</script>