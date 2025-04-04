<template>
  <div class="title-bar">
    <div class="dots-container">
      <div class="dot bg-[#ff5f57]"></div>
      <div class="dot bg-[#ffbd2e]"></div>
      <div class="dot bg-[#28c840]"></div>
    </div>

    <div class="phone-title">
      {{ displayText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore } from '@/stores';
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

const msgStore = useMessageStore()
const displayText = computed(() => msgStore.isTyping ? '正在输入...' : '非常不愉快')
useHead({ title: displayText })
</script>

<style lang="postcss" scoped>
.title-bar {
  @apply relative pointer-events-auto whitespace-nowrap overflow-hidden cursor-move box-border text-center rounded-t-2xl flex-shrink-0 text-[#333] text-[14px] leading-[30px] h-full border-b border-[#f0f0f0] bg-white/90;

  .dots-container {
    @apply absolute left-[15px] top-1/2 transform -translate-y-1/2 flex gap-[5px];

    .dot {
      @apply w-[15px] h-[15px] rounded-full;
    }
  }

  .phone-title {
    @apply hidden;
  }
}

@media (max-width: 600px) {
  .title-bar {
    height: 40px;
    border-bottom-color: #f5f5f5;

    .dots-container {
      @apply hidden;
    }

    .phone-title {
      @apply flex items-center justify-center w-full h-full;
    }
  }
}
</style>