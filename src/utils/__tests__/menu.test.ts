import { useMenuState, useMenuNavigation } from '../menu'
import { ActionMenuItem, ActionMenuItemWithChildren } from '@/types'

describe('useMenuState', () => {
  it('should initialize with null activeIndex', () => {
    const menuState = useMenuState()
    expect(menuState.current.value).toBeNull()
  })

  it('should open menu at specified index', () => {
    const menuState = useMenuState()
    menuState.open(1)
    expect(menuState.current.value).toBe(1)
  })

  it('should close menu', () => {
    const menuState = useMenuState()
    menuState.open(1)
    menuState.close()
    expect(menuState.current.value).toBeNull()
  })

  it('should toggle menu state', () => {
    const menuState = useMenuState()
    menuState.toggle(1)
    expect(menuState.current.value).toBe(1)
    menuState.toggle(1)
    expect(menuState.current.value).toBeNull()
  })

  it('should check if menu is open', () => {
    const menuState = useMenuState()
    menuState.open(1)
    expect(menuState.isOpen(1)).toBe(true)
    expect(menuState.isOpen(2)).toBe(false)
  })
})

describe('useMenuNavigation', () => {
  const menuNavigation = useMenuNavigation()

  it('should check if menu item is expandable', () => {
    const itemWithChildren: ActionMenuItemWithChildren = {
      label: 'Test',
      child: [{ label: 'Child', action: { question: { type: 'text', content: 'test', loadingTime: 0 }, answer: [] } }]
    }
    const itemWithoutChildren: ActionMenuItem = {
      label: 'Test',
      action: { question: { type: 'text', content: 'test', loadingTime: 0 }, answer: [] }
    }

    expect(menuNavigation.isExpandable(itemWithChildren)).toBe(true)
    expect(menuNavigation.isExpandable(itemWithoutChildren)).toBe(false)
  })

  it('should get child items', () => {
    const itemWithChildren: ActionMenuItemWithChildren = {
      label: 'Test',
      child: [{ label: 'Child', action: { question: { type: 'text', content: 'test', loadingTime: 0 }, answer: [] } }]
    }
    const itemWithoutChildren: ActionMenuItem = {
      label: 'Test',
      action: { question: { type: 'text', content: 'test', loadingTime: 0 }, answer: [] }
    }

    expect(menuNavigation.getChildItems(itemWithChildren)).toEqual([{ label: 'Child', action: { question: { type: 'text', content: 'test', loadingTime: 0 }, answer: [] } }])
    expect(menuNavigation.getChildItems(itemWithoutChildren)).toEqual([])
  })
}) 