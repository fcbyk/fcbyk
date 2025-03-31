<template>
  <div class="message-list-container" ref="container">
    <template v-for="(message, index) in messages" :key="index">
      <!-- 时间分隔 -->
      <div class="time-separator" v-if="shouldShowTime(message, index)">
        {{ formatTime(message.time) }}
      </div>
      
      <!-- 消息项 -->
      <div 
        class="message-wrapper"
        :class="{
          'user-wrapper': message.role === 'user',
          'assistant-wrapper': message.role === 'assistant'
        }"
      >
        <!-- 头像 -->
        <div class="avatar">
          <img 
            :src="message.role === 'user' ? userAvatar : assistantAvatar" 
            :alt="message.role"
          />
        </div>
        
        <!-- 消息内容 -->
        <div 
          class="message-item"
          :class="{
            'user-message': message.role === 'user', 
            'assistant-message': message.role === 'assistant',
            'loading-message': message.status === 'loading'
          }"
        >
          <div class="message-content" v-html="renderMarkdown(message.content)"></div>
          <div class="message-loading" v-if="message.status === 'loading'">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { ref, watch, nextTick } from 'vue'

// 默认头像
const userAvatar = ref('https://pic1.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg')
const assistantAvatar = ref('https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3315366793,2321372572&fm=253&gp=0.jpg')

const props = defineProps({
  messages: {
    type: Array,
    required: true,
    default: () => []
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  timeThreshold: {
    type: Number,
    default: 5 * 60 * 1000 // 5分钟
  },
  userAvatar: {
    type: String,
    default: ''
  },
  assistantAvatar: {
    type: String,
    default: ''
  }
})

// 如果传入了自定义头像，则覆盖默认头像
if (props.userAvatar) userAvatar.value = props.userAvatar
if (props.assistantAvatar) assistantAvatar.value = props.assistantAvatar

const container = ref(null)

// 设置 marked 选项
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: (code, lang) => {
    return code
  }
})

// 判断是否需要显示时间分隔
const shouldShowTime = (message, index) => {
  if (!message.time) return false
  
  // 第一条消息总是显示时间
  if (index === 0) return true
  
  const prevMessage = props.messages[index - 1]
  if (!prevMessage.time) return false
  
  // 如果与前一条消息时间间隔超过阈值，则显示时间
  return message.time - prevMessage.time > props.timeThreshold
}

// 渲染 Markdown 为 HTML
const renderMarkdown = (content) => {
  return marked(content || '')
}

// 格式化时间（微信风格）
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  // 今天
  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  // 昨天
  else if (diffDays === 1) {
    return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  // 本周内
  else if (diffDays < 7) {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weekdays[date.getDay()]
  }
  // 今年
  else if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
  // 更早
  else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
}

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (container.value && props.autoScroll) {
      container.value.scrollTop = container.value.scrollHeight
    }
  })
}

// 监听消息变化自动滚动
watch(() => props.messages, scrollToBottom, { deep: true })
</script>

<style scoped>
.message-list-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.message-list-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.message-list-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.time-separator {
  text-align: center;
  margin: 16px 0;
  font-size: 0.75em;
  color: #999;
}

.message-wrapper {
  display: flex;
  gap: 8px;
  max-width: 90%;
}

.user-wrapper {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.assistant-wrapper {
  align-self: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-item {
  border-radius: 8px;
  padding: 10px 14px;
  max-width: calc(100% - 48px);
  box-shadow: 0 1px 1px rgba(73, 73, 73, 0.1);
  position: relative;
}

.user-message {
  background-color: #95ec69;
  margin-left: 40px;
  border-bottom-right-radius: 0;
}

.assistant-message {
  background-color: #ffffff;
  margin-right: 40px;
  border-bottom-left-radius: 0;
}

.loading-message {
  opacity: 0.8;
}

.message-content {
  line-height: 1.5;
  word-break: break-word;
}

.message-loading {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #999;
  animation: pulse 1.5s infinite ease-in-out;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 微信风格三角形箭头 */
.user-message::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 10px;
  width: 0;
  height: 0;
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent #95ec69;
}

.assistant-message::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 10px;
  width: 0;
  height: 0;
  border-width: 6px 6px 6px 0;
  border-color: transparent #ffffff transparent transparent;
}

/* Markdown 内容样式 */
.message-content :deep(h1),
.message-content :deep(h2),
.message-content :deep(h3) {
  line-height: 1.2;
  font-size: 1em;
}

.message-content :deep(ul),
.message-content :deep(ol) {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.message-content :deep(li) {
  margin: 0.25em 0;
}

.message-content :deep(code) {
  background-color: rgba(0,0,0,0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

.message-content :deep(pre) {
  background-color: rgba(0,0,0,0.05);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0.5em 0;
}

.message-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.message-content :deep(blockquote) {
  padding-left: 1em;
  margin: 0.5em 0;
  color: #666;
}

.message-content :deep(a) {
  color: #576b95;
  text-decoration: none;
}

.message-content :deep(a:hover) {
  text-decoration: underline;
}
</style>