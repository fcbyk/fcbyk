<template>
  <div class="file-message" :class="{
    'bg-[var(--user-message-bg)] ml-10 rounded-br-none user-message-arrow': role === 'user',
    'bg-[var(--my-message-bg)] mr-10 rounded-bl-none my-message-arrow': role === 'me'
  }">
    <div class="file-content">
      <div class="file-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="file-info">
        <div class="file-name">{{ content.fileName }}</div>
        <div class="file-size">{{ content.fileSize }}</div>
      </div>
      <button 
        @click="handleDownload"
        class="download-btn"
        :style="{ '--progress': `${downloadProgress}%` }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { MessageRole, MessageStatus, FileContent } from '@/types'

interface Props {
  role: MessageRole
  content: FileContent
  status: MessageStatus
}

const props = defineProps<Props>()
const downloadProgress = ref(0)

const handleDownload = () => {
  // 直接使用a标签下载
  const link = document.createElement('a')
  link.href = props.content.fileUrl
  link.download = props.content.fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // 模拟下载进度
  let progress = 0
  const interval = setInterval(() => {
    progress += 5
    if (progress >= 100) {
      clearInterval(interval)
      downloadProgress.value = 0
    } else {
      downloadProgress.value = progress
    }
  }, 100)
}
</script>

<style scoped>
.file-message {
  @apply p-3 rounded-lg shadow-sm max-w-[80%] flex items-center;
}

.file-content {
  @apply flex items-center gap-3 flex-1;
}

.file-icon {
  @apply p-2 rounded-full bg-blue-100 text-blue-500 flex-shrink-0;
}

.file-info {
  @apply flex-1 min-w-0 flex flex-col;
}

.file-name {
  @apply text-sm text-gray-800 break-all;
}

.file-size {
  @apply text-xs text-gray-500 mt-0.5;
}

.download-btn {
  @apply p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors flex-shrink-0 relative overflow-hidden;
}

.download-btn::before {
  content: '';
  @apply absolute inset-0 bg-blue-500 opacity-20;
  width: var(--progress);
  transition: width 0.1s ease;
}
</style> 