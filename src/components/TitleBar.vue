<template>
  <div class="title-bar">
    <div class="window-controls">
      <div class="control-dot close"></div>
      <div class="control-dot minimize"></div>
      <div class="control-dot maximize"></div>
    </div>

    <div class="mobile-title">
      {{ displayText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMessageStore } from '@/stores';
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useConfigsStore } from '@/stores'

const configsStore = useConfigsStore()
const msgStore = useMessageStore()
const displayText = computed(() => msgStore.isTyping ? '正在输入...' : configsStore.configs.name)
const isMobile = computed(() => window.innerWidth <= 600)
const pageTitle = computed(() => isMobile.value ? configsStore.configs.name : displayText.value)
useHead({ title: pageTitle })
</script>

<style lang="postcss" scoped>
.title-bar {
  @apply relative flex items-center h-full px-4;
  @apply cursor-move select-none;
  
  .window-controls {
    @apply absolute left-[15px] top-1/2 -translate-y-1/2 flex gap-[5px];

    .control-dot {
      @apply w-[15px] h-[15px] rounded-full;
      
      &.close { @apply bg-[var(--close-btn)]; }
      &.minimize { @apply bg-[var(--minimize-btn)]; }
      &.maximize { @apply bg-[var(--maximize-btn)]; }
    }
  }

  .mobile-title {
    @apply hidden text-[var(--text-primary)] text-[15px] font-medium;
  }
}

@media (max-width: 600px) {
  .title-bar {
    @apply justify-center;
    .window-controls {
      @apply hidden;
    }

    .mobile-title {
      @apply flex items-center justify-center w-full h-full;
    }
  }
}
</style>