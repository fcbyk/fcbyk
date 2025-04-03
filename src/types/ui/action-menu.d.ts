import type { QA } from '../chat/qa';

// 基础菜单项
type ActionMenuItemBase = {
  label: string;
  action: QA;
};

// 带子菜单的项
type ActionMenuItemWithChildren = {
  label: string;
  child: {
    label: string;
    action: QA;
  }[];
  action?: never;
};

// 联合类型
type ActionMenuItem = ActionMenuItemBase | ActionMenuItemWithChildren;

// 菜单列表
type ActionMenu = ActionMenuItem[];