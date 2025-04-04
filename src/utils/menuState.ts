import { ref } from 'vue'

export function useMenuState() {
  const activeIndex = ref<number | null>(null)

  const menuState = {
    // 打开指定菜单
    open: (index: number) => {
      activeIndex.value = index
    },
    
    // 关闭菜单
    close: () => {
      activeIndex.value = null
    },
    
    // 切换菜单状态
    toggle: (index: number) => {
      activeIndex.value = activeIndex.value === index ? null : index
    },
    
    // 检查是否打开
    isOpen: (index: number) => {
      return activeIndex.value === index
    },
    
    // 当前打开索引
    current: activeIndex
  }

  return menuState
}