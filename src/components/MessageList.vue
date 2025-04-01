<template>
  <div class="flex flex-col h-full gap-4 p-4 overflow-y-auto no-scrollbar" ref="container">
    <template v-for="(message, index) in messages" :key="index">

      <!-- 时间分隔 -->
      <div class="text-[#999] text-center my-2 text-xs" v-if="shouldShowTime(message, index)">
        {{ formatTime(message.time) }}
      </div>

      <!-- 消息项 -->
      <div class="flex gap-2 max-w-[90%]" :class="{
        'flex-row-reverse self-end': message.role === 'user',
        'self-start': message.role === 'me'
      }">
        <!-- 头像 -->
        <div class="w-[40px] h-[40px] rounded-[4px] overflow-hidden flex-shrink-0">
          <img class="object-cover w-full h-full" :src="message.role === 'user' ? userAvatar : myAvatar"
            :alt="message.role" />
        </div>

        <!-- 消息内容 -->
        <div class="message-item" :class="{
          'bg-[#95ec69] ml-10 rounded-br-none user-message-arrow ': message.role === 'user',
          'bg-white mr-10 rounded-bl-none my-message-arrow': message.role === 'me',
          'opacity-80': message.status === 'loading'
        }">
          <div class="leading-normal break-words" v-html="message.content"></div>
          <div class="flex justify-center gap-1 mt-2" v-if="message.status === 'loading'">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse animation-delay-200"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-message-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import formatTime from '@/utils/formatTime'
import chatConfig from '@/chat.config'

const props = defineProps({
  messages: {
    type: Array,
    required: true,
    default: []
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
})

const userAvatar = chatConfig.avatar.user
const myAvatar = chatConfig.avatar.me
const container = ref(null)

const shouldShowTime = (message, index) => {
  if (!message.time) return false

  // 第一条消息总是显示时间
  if (index === 0) return true

  const prevMessage = props.messages[index - 1]
  if (!prevMessage.time) return false

  // 如果与前一条消息时间间隔超过阈值，则显示时间
  return message.time - prevMessage.time > chatConfig.timeThreshold
}

// 监听消息变化自动滚动
watch(
  () => props.messages,
  () => nextTick(() => {
    // 自动滚动到底部
    if (container.value && props.autoScroll)
      container.value.scrollTop = container.value.scrollHeight
  }),
  { deep: true })
</script>

<style lang="postcss" scoped>
.message-item {
  border-radius: 8px;
  padding: 10px 14px;
  max-width: calc(100% - 48px);
  box-shadow: 0 1px 1px rgba(73, 73, 73, 0.1);
  position: relative;
}
</style>