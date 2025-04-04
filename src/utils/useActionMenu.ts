import type { ActionMenuItem, ActionMenuItemWithChildren } from '@/types'

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