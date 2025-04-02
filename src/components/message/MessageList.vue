<template>
  <div class="flex flex-col h-full gap-4 p-4 overflow-y-auto msg-list no-scrollbar " ref="container">
    <template v-for="(message, index) in messages" :key="index">
      
      <div class="text-[#999] text-center my-2 text-xs" v-if="shouldShowTime(message, index)">
        {{ formatTime(message.time) }}
      </div>

      <MessageItem :role="message.role">
        <TextMessage :role="message.role" :content="message.content" :status="message.status" />
      </MessageItem>

    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, inject } from 'vue'
import formatTime from '@/utils/formatTime'
import chatConfig from '@/chat.config'
import MessageItem from './MessageItem.vue'
import TextMessage from './TextMessage.vue'

const messages = inject('messages')
const container = ref(null)

// 如果与前一条消息时间间隔超过阈值，则显示时间
const shouldShowTime = (message, index) => {
  if (!message.time) return false
  if (index === 0) return true
  const prevMessage = messages.value[index - 1]
  if (!prevMessage.time) return false
  return message.time - prevMessage.time > chatConfig.timeThreshold
}

// 监听消息变化自动滚动
watch(
  () => messages.value,
  () => nextTick(() => {
    if (container.value) container.value.scrollTop = container.value.scrollHeight
  }),
  { deep: true })
</script>