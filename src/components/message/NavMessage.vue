<template>
    <div class="bookmark-message" :class="{
        'ml-10': role === 'user',
        'mr-10': role === 'me'
    }">
        <a :href="content.link" target="_blank" rel="noopener noreferrer" class="bookmark-container">
            <!-- 上部分：图标和内容 -->
            <div class="bookmark-main">
                <div v-if="content.icon" class="bookmark-icon">
                    <img v-if="typeof content.icon === 'string'" :src="content.icon" alt="网站图标" />
                    <div v-else-if="content.icon?.svg" v-html="content.icon.svg"></div>
                    <div v-else class="default-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                </div>

                <div class="bookmark-content">
                    <div class="bookmark-title">{{ content.title }}</div>
                    <div v-if="content.desc" class="bookmark-desc">{{ content.desc }}</div>
                </div>
            </div>

            <!-- 分割线 -->
            <div class="bookmark-divider"></div>

            <!-- 下部分：链接 -->
            <div class="bookmark-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{{ content.link }}</span>
            </div>
        </a>
    </div>
</template>

<script setup>
defineProps({
    role: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true,
        validator: (value) => {
            return value && typeof value.title === 'string' && typeof value.link === 'string'
        }
    }
})
</script>

<style lang="postcss" scoped>
.bookmark-message {
    @apply relative max-w-[80%] mb-2;
}

.bookmark-container {
    @apply flex flex-col bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200 overflow-hidden;
    text-decoration: none;
    color: inherit;
}

.bookmark-main {
    @apply flex items-start gap-3 p-3;
}

.bookmark-icon {
    @apply flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center;
}

.bookmark-icon img {
    @apply w-full h-full object-cover;
}

.default-icon {
    @apply text-gray-400;
}

.bookmark-content {
    @apply flex-1 min-w-0;
}

.bookmark-title {
    @apply text-base font-medium text-gray-900 mb-1 truncate;
}

.bookmark-desc {
    @apply text-sm text-gray-600 line-clamp-2;
}

.bookmark-divider {
    @apply bg-gray-200 w-full;
}

.bookmark-link {
    @apply flex items-center gap-2 px-3 py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-200;
}

.bookmark-link svg {
    @apply text-gray-400 flex-shrink-0;
}

.bookmark-link span {
    @apply truncate;
}
</style>