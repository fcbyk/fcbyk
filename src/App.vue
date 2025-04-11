<script setup lang="ts">
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import BottomBar from './components/bottom/BottomBar.vue';
import MessageList from './components/message/MessageList.vue';
import WaveBackground from '@/components/bg/WaveBackground.vue';
import LoadingBar from './components/common/LoadingBar.vue'
import { ref, onMounted } from 'vue'
import { sleep } from './utils';
import { useConfigsStore } from './stores';
import { useHead } from '@vueuse/head'

const loadingBar = ref()
const isAppReady = ref(false)
const configsStore = useConfigsStore()
const title = ref(configsStore.configs.name)

// 设置动态标题
useHead({ title })

onMounted(async () => {
  try {
    loadingBar.value?.startLoading()

    // @ts-ignore
    const { default: config } = await import(/* @vite-ignore */import.meta.env.VITE_APP_CDN)
    configsStore.setConfigs(config)
    configsStore.isConfigLoaded = true

    console.log(...(configsStore.configs.cliPrint ?? []));
  } finally {
    // 完成后结束进度条并显示内容
    loadingBar.value?.endLoading()
    // 添加小延迟确保过渡更平滑
    await sleep(100)
    isAppReady.value = true
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-[100dvh]">
    <loading-bar ref="loadingBar" />

    <WaveBackground backgroundColor="#f5f9ff" waveColorStart="rgba(80, 180, 240, 0.6)"
      waveColorEnd="rgba(180, 220, 255, 0.2)" :waveHeight="30" :secondaryWaveHeight="20" :animationSpeed="0.04"
      :wavePosition="0.6" />

    <Transition name="scale">
      <chat-window v-if="isAppReady">
        <template #title-bar>
          <title-bar />
        </template>

        <template #main>
          <MessageList />
          <router-view></router-view>
        </template>

        <template #bottom-bar>
          <BottomBar />
        </template>
      </chat-window>
    </Transition>

    <div class="absolute left-0 right-0 hidden text-xs text-center text-[var(--text-secondary)] bottom-2 md:block">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022034851号-1</a>
    </div>
  </div>
</template>

<style scoped>
/* 缩放效果 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
