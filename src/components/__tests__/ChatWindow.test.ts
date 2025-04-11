import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatWindow from '../ChatWindow.vue'

describe('ChatWindow', () => {
  it('渲染基本结构', () => {
    const wrapper = mount(ChatWindow)
    
    // 检查主要容器是否存在
    expect(wrapper.find('.chat-window').exists()).toBe(true)
    
    // 检查三个主要插槽区域是否存在
    expect(wrapper.find('.title-bar').exists()).toBe(true)
    expect(wrapper.find('.main').exists()).toBe(true)
    expect(wrapper.find('.bottom-bar').exists()).toBe(true)
  })

  it('正确渲染插槽内容', () => {
    const wrapper = mount(ChatWindow, {
      slots: {
        'title-bar': '<div class="test-title">标题栏</div>',
        'main': '<div class="test-main">主要内容</div>',
        'bottom-bar': '<div class="test-bottom">底部栏</div>'
      }
    })

    // 检查插槽内容是否正确渲染
    expect(wrapper.find('.test-title').text()).toBe('标题栏')
    expect(wrapper.find('.test-main').text()).toBe('主要内容')
    expect(wrapper.find('.test-bottom').text()).toBe('底部栏')
  })

  it('具有正确的DOM结构', () => {
    const wrapper = mount(ChatWindow)
    const chatWindow = wrapper.find('.chat-window')
    
    // 检查是否有正确的DOM结构
    expect(chatWindow.exists()).toBe(true)
    expect(chatWindow.find('.title-bar').exists()).toBe(true)
    expect(chatWindow.find('.main').exists()).toBe(true)
    expect(chatWindow.find('.bottom-bar').exists()).toBe(true)
  })
}) 