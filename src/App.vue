<script setup>
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import ActionMenu from '@/components/ActionMenu.vue'
import MessageList from './components/MessageList.vue';
import menu from './data/menu';
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

  setTimeout(() => {
    const responseIndex = messageHistory.value.length - 1
    messageHistory.value[responseIndex] = {
      role: 'me',
      content: `系统繁忙，请稍后再试`,
      status: 'completed',
      time: Date.now()
    }
    isSending.value = false
  }, 1000)
}
</script>

<template>
  <div class="centered">
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
  </div>
</template>

<style lang="postcss" scoped>
.centered {
  @apply flex justify-center items-center h-[100dvh];
}
</style>
