<template>
  <div class="action-menu-container">
    <div v-for="(item, index) in menu" :key="index" class="menu-item" @click="handleClick(item, index)">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import SendMessage from '@/utils/SendMessage'
import chatConfig from '@/chat.config'

const menu = chatConfig.actionMenu
const isSending = inject('isSending')
const messageHistory = inject('messages')
const sendMessage = new SendMessage(messageHistory)

const handleClick = async (item) => {
  if (isSending.value) return;
  try {
    await sendMessage.userSendMessage(item)
    isSending.value = true
    await sendMessage.meSendMessage("系统繁忙，请稍后再试", 1000)
  } finally {
    isSending.value = false
  }
}

onMounted(async () => {
  isSending.value = true
  await sendMessage.meSendMessage("你好！我是不愉，你有什么要问我的吗？", 1000)
  isSending.value = false
})
</script>

<style lang="postcss" scoped>
.action-menu-container {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
}

.menu-item {
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  @apply flex items-center justify-center;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item:not(:last-child) {
  border-right: none;
}
</style>