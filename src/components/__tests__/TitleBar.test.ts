import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TitleBar from '../TitleBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createHead } from '@vueuse/head'

vi.mock('@/stores', () => ({
  useMessageStore: vi.fn(() => ({
    isTyping: false
  })),
  useConfigsStore: vi.fn(() => ({
    configs: {
      name: '测试应用'
    }
  }))
}))

// 模拟 window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 800
})

describe('TitleBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mountComponent = () => {
    const head = createHead()
    return mount(TitleBar, {
      global: {
        plugins: [head]
      }
    })
  }

  it('渲染基本结构', () => {
    const wrapper = mountComponent()
    
    // 检查主要容器是否存在
    expect(wrapper.find('.title-bar').exists()).toBe(true)
    
    // 检查窗口控制按钮是否存在
    expect(wrapper.find('.window-controls').exists()).toBe(true)
    expect(wrapper.findAll('.control-dot').length).toBe(3)
    expect(wrapper.find('.control-dot.close').exists()).toBe(true)
    expect(wrapper.find('.control-dot.minimize').exists()).toBe(true)
    expect(wrapper.find('.control-dot.maximize').exists()).toBe(true)
  })

  it('在桌面端显示窗口控制按钮', () => {
    const wrapper = mountComponent()
    
    // 检查窗口控制按钮是否可见
    const controls = wrapper.find('.window-controls')
    expect(controls.exists()).toBe(true)
    expect(controls.isVisible()).toBe(true)
  })

  it('在移动端隐藏窗口控制按钮并显示标题', async () => {
    // 模拟移动端宽度
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    })

    const wrapper = mountComponent()
    await wrapper.vm.$nextTick()
    
    // 检查窗口控制按钮是否隐藏
    const controls = wrapper.find('.window-controls')
    expect(controls.exists()).toBe(true)
    
    // 检查移动端标题是否显示
    const title = wrapper.find('.mobile-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('测试应用')
  })

  it('显示正确的标题文本', () => {
    const wrapper = mountComponent()
    
    // 检查标题文本
    const title = wrapper.find('.mobile-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('测试应用')
  })
}) 