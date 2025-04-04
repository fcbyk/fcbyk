import type { QA } from '../chat/qa';

// 基础菜单项
export type ActionMenuItemBase = {
  label: string;
  action: QA;
};

// 带子菜单的项
export type ActionMenuItemWithChildren = {
  label: string;
  child: {
    label: string;
    action: QA;
  }[];
  action?: never;
};

// 联合类型
export type ActionMenuItem = ActionMenuItemBase | ActionMenuItemWithChildren;

// 菜单列表
export type ActionMenu = ActionMenuItem[];