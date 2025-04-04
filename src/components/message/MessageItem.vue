<template>
    <div class="message-container" :class="{
        'user-message': role === 'user',
        'my-message': role === 'me'
    }">

        <div class="avatar-container">
            <img class="avatar-image" :src="role === 'user' ? userAvatar : myAvatar" :alt="role" />
        </div>

        <slot></slot>

    </div>
</template>

<script lang="ts" setup>
import chatConfig from '@/configs'

const userAvatar = chatConfig.avatar.user
const myAvatar = chatConfig.avatar.me

defineProps({
    role: {
        type: String,
        required: true
    }
})
</script>

<style lang="postcss" scoped>
.message-container {
    @apply flex gap-2 max-w-[90%];

    &.user-message {
        @apply flex-row-reverse self-end;
    }

    &.my-message {
        @apply self-start;
    }

    .avatar-container {
        @apply w-[40px] h-[40px] rounded-[4px] overflow-hidden flex-shrink-0;

        .avatar-image {
            @apply object-cover w-full h-full;
        }
    }
}
</style>