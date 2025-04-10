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
    const config = await import('https://cdn.jsdelivr.net/gh/fcbyk/fcbyk@site-config/index.js')
    configsStore.setConfigs(config.default)

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
        </template>

        <template #bottom-bar>
          <BottomBar />
        </template>
      </chat-window>
    </Transition>

    <div class="absolute left-0 right-0 hidden text-xs text-center text-gray-400 bottom-2 md:block">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022034851号-1</a>
    </div>
  </div>
</template>

<style scoped>
/* 1. 淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 2. 从下往上滑入 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 3. 缩放效果 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 4. 从右侧滑入 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 5. 3D翻转效果 */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateX(-70deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateX(70deg);
}

/* 6. 弹性缩放效果 */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
