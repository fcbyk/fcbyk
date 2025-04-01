<script setup>
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import ActionMenu from '@/components/ActionMenu.vue'
import MessageList from './components/MessageList.vue';
import WaveBackground from '@/components/bg/WaveBackground.vue';
</script>

<template>
  <div class="flex justify-center items-center h-[100dvh]">

    <!-- 使用波浪背景组件 -->
    <WaveBackground backgroundColor="#f5f9ff" waveColorStart="rgba(80, 180, 240, 0.6)"
      waveColorEnd="rgba(180, 220, 255, 0.2)" :waveHeight="40" :secondaryWaveHeight="25" :animationSpeed="0.04"
      :wavePosition="0.6" />

    <chat-window>

      <template #title-bar>
        <title-bar />
      </template>

      <template #main>
        <MessageList />
      </template>

      <template #bottom-bar>
        <ActionMenu/>
      </template>
    </chat-window>

    <!-- 添加备案号 -->
    <div class="absolute left-0 right-0 hidden text-xs text-center text-gray-400 bottom-2 md:block">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022034851号-1</a>
    </div>
  </div>
</template>
