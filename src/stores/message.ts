import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createMessageSender } from '@/utils'
import type { Message, MessageType, QA } from '@/types'

export const useMessageStore = defineStore('message', () => {

  // 状态
  const isTyping = ref(false)
  const messageList = ref<Message[]>([])

  // 创建消息发送器实例
  const messageSender = createMessageSender(messageList)

  // 输入状态控制
  const startTyping = () => { isTyping.value = true }
  const stopTyping = () => { isTyping.value = false }
  const toggleTyping = () => { isTyping.value = !isTyping.value }

  // 初始化问候
  const init = async () => {
    if (messageList.value.length === 0)
      await meSend("你好！我是不愉，你有什么要问我的吗？", 1000)
  }

  // 封装带状态控制的发送方法
  const userSend = async (content: string, type: MessageType = 'text') => {
    await messageSender.sendAsUser(content, type)
  }

  const meSend = async (content: string, loadingTime: number = 100, type: MessageType = 'text') => {
    startTyping()
    try {
      await messageSender.sendAsMe(content, loadingTime, type)
    } finally {
      stopTyping()
    }
  }

  const questionAnswer = async (qa: QA) => {
    if (isTyping.value) return
    await userSend(qa.question.content)
    for (const element of qa.answer)
      await meSend(element.content, element.loadingTime)
  }

  return {
    // 状态
    isTyping,
    messageList,

    init,
    questionAnswer,

    // 操作方法
    startTyping,
    stopTyping,
    toggleTyping,

    // 发送方法
    userSend,
    meSend,

    // 原始发送器
    messageSender
  }
})