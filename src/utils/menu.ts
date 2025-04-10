import { ref } from 'vue'
import type { ActionMenuItem, ActionMenuItemWithChildren } from '@/types'

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

export function useMenuNavigation() {
  /**
   * 检查菜单项是否可展开（有子菜单）
   */
  const isExpandable = (item: ActionMenuItem): item is ActionMenuItemWithChildren => {
    return 'child' in item && item.child?.length > 0
  }

  /**
   * 获取子菜单项列表
   */
  const getChildItems = (item: ActionMenuItem) => {
    return isExpandable(item) ? item.child : []
  }

  return {
    isExpandable,
    getChildItems
  }
}