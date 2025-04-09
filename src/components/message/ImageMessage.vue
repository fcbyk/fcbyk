<template>
  <div class="image-message" :class="{
    'ml-10': role === 'user',
    'mr-10': role === 'me'
  }">
    <!-- 图片容器 -->
    <div class="image-container">
      <img 
        :src="content" 
        alt="图片消息" 
        class="image-content" 
        @click="openPreview" 
        v-show="canShowImage"
        @load="handleImageLoad"
        @error="handleImageError"
      />
      <!-- 加载骨架屏 -->
      <div v-show="!canShowImage" class="image-skeleton">
        <div class="skeleton-animation"></div>
      </div>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="showPreview" class="preview-modal" @click.self="closePreview">
      <div class="preview-content">
        <img :src="content" alt="预览图片" class="preview-image" />
        <button @click="closePreview" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

const showPreview = ref(false)
const imageLoaded = ref(false)
const loadStartTime = ref(0)

const canShowImage = computed(() => {
  if (props.status === 'loading') return false
  if (!imageLoaded.value) return false
  
  // 确保至少显示500ms的加载动画
  const timeElapsed = Date.now() - loadStartTime.value
  return timeElapsed >= 500
})

const handleImageLoad = () => {
  console.log('图片加载成功')
  setTimeout(() => {
    imageLoaded.value = true
  }, Math.max(0, 500 - (Date.now() - loadStartTime.value)))
}

const handleImageError = (error) => {
  console.error('图片加载失败:', error)
  imageLoaded.value = false
}

// 监听content的变化，重置加载状态
watch(() => props.content, () => {
  imageLoaded.value = false
  loadStartTime.value = Date.now()
})

// 监听status的变化
watch(() => props.status, (newStatus) => {
  if (newStatus === 'loading') {
    loadStartTime.value = Date.now()
    imageLoaded.value = false
  }
})

onMounted(() => {
  loadStartTime.value = Date.now()
  if (!props.content) {
    imageLoaded.value = true
  }
})

const openPreview = () => {
  showPreview.value = true
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  showPreview.value = false
  document.body.style.overflow = ''
}
</script>

<style lang="postcss" scoped>
.image-message {
  @apply relative max-w-[80%] mb-2;
}

.image-container {
  @apply rounded-lg overflow-hidden max-w-[300px] max-h-[300px] relative;
}

.image-content {
  @apply max-w-full max-h-full object-cover block rounded-lg cursor-pointer;
  transition: transform 0.2s;
}

.image-content:hover {
  transform: scale(1.02);
}

/* 加载骨架屏样式 */
.image-skeleton {
  @apply w-[150px] h-[150px] bg-gray-200 rounded-lg overflow-hidden relative;
}

.skeleton-animation {
  @apply absolute inset-0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: skeleton-shine 1.5s infinite;
}

@keyframes skeleton-shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 预览模态框样式 */
.preview-modal {
  @apply fixed inset-0 bg-black/80 flex items-center justify-center z-[1000];
}

.preview-content {
  @apply relative max-w-[90%] max-h-[90%];
}

.preview-image {
  @apply max-w-full max-h-[80vh] object-contain;
}

.close-button {
  @apply absolute -top-10 right-0 bg-none border-none text-white cursor-pointer p-1;
}

.close-button svg {
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
}
</style>