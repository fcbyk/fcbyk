import { ref, Ref } from 'vue'
import { createMessageSender, createMessageCreator } from '../message'
import { Message, MessageType } from '@/types'

describe('createMessageSender', () => {
  let messageList: Ref<Message[]>
  let messageSender: ReturnType<typeof createMessageSender>

  beforeEach(() => {
    messageList = ref<Message[]>([])
    messageSender = createMessageSender(messageList)
  })

  it('should send a message with default parameters', async () => {
    await messageSender.send('user', 'Hello')
    expect(messageList.value!).toHaveLength(1)
    expect(messageList.value![0]).toEqual(expect.objectContaining({
      role: 'user',
      content: 'Hello',
      type: 'text',
      status: 'completed'
    }))
  })

  it('should send a message with loading time', async () => {
    const sendPromise = messageSender.send('me', 'Hello', 100)
    expect(messageList.value![0].status).toBe('loading')
    await sendPromise
    expect(messageList.value![0].status).toBe('completed')
  })

  it('should send message as user', async () => {
    await messageSender.sendAsUser('Hello')
    expect(messageList.value![0]).toEqual(expect.objectContaining({
      role: 'user',
      content: 'Hello',
      type: 'text'
    }))
  })

  it('should send message as me', async () => {
    await messageSender.sendAsMe('Hello', 100)
    expect(messageList.value![0]).toEqual(expect.objectContaining({
      role: 'me',
      content: 'Hello',
      type: 'text'
    }))
  })
})

describe('createMessageCreator', () => {
  it('should create message config with default parameters', () => {
    const createTextMessage = createMessageCreator('text')
    const config = createTextMessage('Hello')
    expect(config).toEqual({
      type: 'text',
      content: 'Hello',
      loadingTime: 0
    })
  })

  it('should create message config with custom loading time', () => {
    const createTextMessage = createMessageCreator('text')
    const config = createTextMessage('Hello', 1000)
    expect(config).toEqual({
      type: 'text',
      content: 'Hello',
      loadingTime: 1000
    })
  })

  it('should throw error when content is empty', () => {
    const createTextMessage = createMessageCreator('text')
    expect(() => createTextMessage('')).toThrow('消息不能为空')
  })
}) 