<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '@/stores'
import ActionMenu from './ActionMenu.vue'
import ChatInput from './ChatInput.vue'

const currentMode = ref<'text' | 'menu'>('menu')
const message = ref('')
const messageStore = useMessageStore()

const toggleMode = () => {
  currentMode.value = currentMode.value === 'text' ? 'menu' : 'text'
}

const handleSubmit = async (msg: string) => {
  await messageStore.userSend(msg)
  message.value = ''
  await messageStore.meSend(`⚠️ 404_Response_From_Server`,1000)
  await messageStore.meSend(`您发送的 ${msg.length}bytes 数据包已丢失`, 1000)
}
</script>

<template>
  <div class="chat-container first-letter:border-t border-gray-200 flex" :class="{
    'bg-[#F7F7F7]': currentMode === 'text',
    'bg-white': currentMode === 'menu',
  }">
    <div class="flex items-end p-2 " :class="{
      'pb-3': currentMode === 'text',
      'pb-2': currentMode === 'menu',
    }">
      <button @click="toggleMode" class="rounded-full p-1">
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

    <div class="flex-1 transition-all duration-200">
      <ActionMenu v-if="currentMode === 'menu'"/>

      <ChatInput v-if="currentMode === 'text'" v-model="message" @submit="handleSubmit" />
    </div>
  </div>
</template>


<style scoped lang="postcss">
.chat-container {
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 600px) {
  .chat-container {
    @apply pl-[5px]
  }
}
</style>