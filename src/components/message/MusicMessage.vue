<template>
    <div class="music-message" :class="{
      'ml-10': role === 'user',
      'mr-10': role === 'me'
    }">
      <!-- 音乐容器 -->
      <div class="music-container">
        <!-- 圆形进度条加载效果 -->
        <div v-if="status === 'loading'" class="music-loading">
          <div class="loading-spinner">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            <div class="loading-text">加载音乐中...</div>
          </div>
        </div>
        <!-- 音乐播放器 -->
        <iframe 
          v-else
          frameborder="no" 
          border="0" 
          marginwidth="0" 
          marginheight="0" 
          :src="musicUrl"
          class="music-iframe"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
      default: '2645500113'
    }
  })
  
  const musicUrl = ref('//music.163.com/outchain/player?type=2&id=' + props.content + '&auto=0&height=66');
  </script>
  
  <style lang="postcss" scoped>
  .music-message {
    @apply relative max-w-[80%] mb-2;
  }
  
  .music-container {
    @apply rounded-lg overflow-hidden relative;
    width: 330px;
    max-width: 100%;
    min-height: 86px;
  }
  
  .music-iframe {
    @apply w-full h-[86px] rounded-lg;
    min-width: 300px;
  }
  
  /* 圆形进度条加载效果 */
  .music-loading {
    @apply w-full h-full flex items-center justify-center bg-gray-100 rounded-lg;
    min-width: 300px;
    min-height: 86px;
  }
  
  .loading-spinner {
    @apply flex flex-col items-center justify-center;
  }
  
  .spinner {
    @apply w-10 h-10;
    animation: rotate 2s linear infinite;
  }
  
  .path {
    @apply stroke-blue-500;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  .loading-text {
    @apply mt-2 text-sm text-gray-600;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  
  /* 响应式调整 */
  @media (max-width: 480px) {
    .music-container {
      width: 100%;
    }
    
    .music-iframe,
    .music-loading {
      min-width: 280px;
      height: 80px;
    }
    
    .music-message {
      @apply max-w-[90%];
    }
    
    .spinner {
      @apply w-8 h-8;
    }
    
    .loading-text {
      @apply text-xs;
    }
  }
  </style>