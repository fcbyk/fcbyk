<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '@/stores'
import ActionMenu from './ActionMenu.vue'
import ChatInput from './ChatInput.vue'
import { getRandomElement } from '@/utils'
import { useConfigsStore } from '@/stores'
import { createMessageCreator } from '@/utils'

const text = createMessageCreator("text");
const currentMode = ref<'text' | 'menu'>('menu')
const message = ref('')
const messageStore = useMessageStore()
const isAnimating = ref(false)
const configsStore = useConfigsStore()

const toggleMode = async () => {
  isAnimating.value = true
  await new Promise(resolve => setTimeout(resolve, 300)) // 等待下滑动画完成
  currentMode.value = currentMode.value === 'text' ? 'menu' : 'text'
  isAnimating.value = false
}

const handleSubmit = async (msg: string) => {
  // 发送用户消息并清空输入
  await messageStore.userSend(msg);
  message.value = '';

  // 检查关键词回复
  const { keywordReply, autoReply } = configsStore.configs;
  const matchedKeyword = Object.keys(keywordReply).find(key => msg.includes(key));  

  if (matchedKeyword) {
    // 处理关键词回复
    await messageStore.answer(keywordReply[matchedKeyword])
    return;
  }

  autoReply.push([text(`您发送的 ${msg.length}bytes 数据包已丢失`, 1000)])
  await messageStore.answer(getRandomElement(autoReply))
  autoReply.pop()
}
</script>

<template>
  <Transition name="slide-root" mode="out-in">
    <div class="chat-container first-letter:border-t border-gray-200 flex" :class="{
      'bg-[#F7F7F7]': currentMode === 'text',
      'bg-white': currentMode === 'menu',
    }" :key="currentMode">
      <div class="flex items-end p-2 " :class="{
        'pb-3': currentMode === 'text',
        'pb-2': currentMode === 'menu',
      }">
        <button @click="toggleMode" class="rounded-full p-1" :disabled="isAnimating">
          <svg v-if="currentMode === 'text'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <div class="flex-1">
        <ActionMenu v-if="currentMode === 'menu'" />
        <ChatInput v-else v-model="message" @submit="handleSubmit" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
.chat-container {
  border-top: 1px solid #e5e7eb;
}

/* 根组件滑动动画 */
.slide-root-enter-active,
.slide-root-leave-active {
  /* transition: all 0.3s ease; */
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-root-enter-from,
.slide-root-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-root-enter-to,
.slide-root-leave-from {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 600px) {
  .chat-container {
    @apply px-[10px]
  }
}
</style>