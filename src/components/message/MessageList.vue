<template>
  <div class="message-list-container no-scrollbar" ref="container">
    <template v-for="(message, index) in messageStore.messageList" :key="message.time">
      <div class="time-divider" v-if="shouldShowTime(message, index)">
        {{ formatTime(message.time) }}
      </div>

      <MessageItem :role="message.role">
        <component :is="getMessageComponent(message.type)" :role="message.role" :content="message.content"
          :status="message.status" />
      </MessageItem>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useMessageStore, useConfigsStore } from '@/stores'
import { formatTime } from '@/utils'
import MessageItem from './MessageItem.vue'
import TextMessage from './TextMessage.vue'
import ImageMessage from './ImageMessage.vue'
import HTMLMessage from './HTMLMessage.vue'

const messageStore = useMessageStore()
const configsStore = useConfigsStore()
const container = ref(null)

// 消息类型与组件的映射关系
const messageComponents = {
  text: TextMessage,
  image: ImageMessage,
  html: HTMLMessage,
}

// 根据消息类型获取对应的组件
const getMessageComponent = (type) => {
  return messageComponents[type] || TextMessage // 默认返回文本消息组件
}

// 如果与前一条消息时间间隔超过阈值，则显示时间
const shouldShowTime = (message, index) => {
  if (!message.time) return false
  if (index === 0) return true
  const prevMessage = messageStore.messageList[index - 1]
  if (!prevMessage.time) return false
  return message.time - prevMessage.time > configsStore.configs.timeThreshold
}

// 监听消息变化自动滚动
watch(
  () => messageStore.messageList,
  () => nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  }),
  { deep: true }
)
</script>

<style lang="postcss" scoped>
.message-list-container {
  @apply flex flex-col h-full gap-4 p-4 overflow-y-auto;

  .time-divider {
    @apply text-[#999] text-center my-2 text-xs;
  }
}

@media (max-width: 600px) {
  .message-list-container {
    @apply py-[5px] px-[8px] pb-[10px];
  }
}
</style>