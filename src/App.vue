<script setup>
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import ActionMenu from '@/components/ActionMenu.vue'
import MessageList from './components/MessageList.vue';
import WaveBackground from '@/components/bg/WaveBackground.vue';
import menu from './data/menu';
import sleep from './utils/sleep';
import { ref } from 'vue'

const newMessage = ref('')
const isSending = ref(false)

const messageHistory = ref([
  {
    role: 'me',
    content: '你好！我是不愉，你有什么要问我的吗？',
    time: Date.now()
  }
])

const handleMenuClick = async ({ item, index }) => {
  // 如果正在发送消息，则直接返回，不执行后续操作
  if (isSending.value) return;

  const content = newMessage.value.trim()

  messageHistory.value.push({
    role: 'user',
    content: item,
    time: Date.now()
  })

  newMessage.value = ''
  isSending.value = true

  const aiMessage = {
    role: 'me',
    content: '',
    status: 'loading',
    time: Date.now()
  }
  messageHistory.value.push(aiMessage)

  try {
    await sleep(1000)

    const responseIndex = messageHistory.value.length - 1

    messageHistory.value[responseIndex] = {
      role: 'me',
      content: `系统繁忙，请稍后再试`,
      status: 'completed',
      time: Date.now()
    }
  } finally {
    // 无论成功还是失败，最终都要将 isSending 设为 false
    isSending.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-[100dvh]">

    <!-- 使用波浪背景组件 -->
    <WaveBackground backgroundColor="#f5f9ff" waveColorStart="rgba(80, 180, 240, 0.6)"
      waveColorEnd="rgba(180, 220, 255, 0.2)" :waveHeight="40" :secondaryWaveHeight="25" :animationSpeed="0.04"
      :wavePosition="0.6" />

    <chat-window>

      <template #title-bar>
        <title-bar></title-bar>
      </template>

      <template #main>
        <MessageList :messages="messageHistory" />
      </template>

      <template #bottom-bar>
        <ActionMenu :menu @menu-click="handleMenuClick" />
      </template>
    </chat-window>

    <!-- 添加备案号 -->
    <div class="absolute left-0 right-0 hidden text-xs text-center text-gray-400 bottom-2 md:block">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022034851号-1</a>
    </div>
  </div>
</template>
